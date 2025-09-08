import { KeyBuffer, LaxElement } from "@lax"

export type Lax<State extends {} = {}> = {
  state: State
  elements: LaxElement[]
  keysDown: KeyBuffer
  append: (element: LaxElement, isChild?: boolean) => boolean
  remove: (element: LaxElement) => boolean
}

export type LaxProps<State extends {}> = {
  state: State
  elements?: LaxElement[]
  options?: {
    backgroundColor?: string
  }
}

export const Lax = <State extends {} = {}>(props: LaxProps<State>): Lax<State> => {

  let ready = false

  const lax: Lax<State> = {
    state: props.state,
    elements: [],
    keysDown: KeyBuffer(),
    append: (element: LaxElement, isChild = false) => {
      lax.elements.push(element)
      element.lax = lax

      if (!isChild) document.body.appendChild(element.e)

      if (element.children) {
        for (const child of element.children) {
          element.e.appendChild(child.e)
          lax.append(child, true)
        }
      }

      return true
    },
    remove: (element: LaxElement) => {
      const index = lax.elements.indexOf(element)
      if (index === -1) return false

      lax.elements.splice(index, 1)
      if (element.e.parentElement) element.e.parentElement.removeChild(element.e)

      return true
    }
  }

  const update = () => {
    requestAnimationFrame(update)

    if (!ready && document.body) {
      document.body.style.backgroundColor = props.options?.backgroundColor ?? "black"
      document.body.style.overflowX = "hidden"
      document.body.style.overflowY = "hidden"

      if (props.elements) {
        for (const element of props.elements) {
          lax.append(element)
        }
      }

      ready = true
    }

    for (const element of lax.elements) {
      element.update?.()

      if (element.children) {
        for (const child of element.children) {
          child.update?.()
        }
      }

      lax.keysDown.updateHold()
    }
  }

  document.addEventListener("keydown", (event) => {
    if (document.hasFocus()) {
      let key = event.key.toLowerCase()

      // prevent defaults
      // if (charactersPreventDefault.has(key)) event.preventDefault()

      // add to buffer
      if (!lax.keysDown.get(key)) {
        lax.keysDown.push({ key, hold: 0 })
      }
    }
  })

  document.addEventListener("keyup", (event) => {
    const key = event.key.toLowerCase()

    lax.keysDown.remove(key)
  })

  requestAnimationFrame(update)

  return lax
}
