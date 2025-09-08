import { KeyBuffer, LaxElement } from "@lax"

export type Lax<State extends {} = {}> = {
  state: State
  elements: LaxElement[]
  keysDown: KeyBuffer
  append: (element: LaxElement, isChild: boolean) => boolean
  remove: (element: LaxElement) => boolean
}

export type LaxOptions = {
  backgroundColor?: string
}

export const Lax = <State extends {} = {}>(state: State, options: LaxOptions): Lax<State> => {

  let ready = false

  const lax: Lax<State> = {
    state,
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
      document.body.style.backgroundColor = options.backgroundColor ?? "black"
      document.body.style.overflowX = "hidden"
      document.body.style.overflowY = "hidden"
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
