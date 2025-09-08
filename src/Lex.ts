import { KeyBuffer, LexColor, LexElement } from "@piggo-gg/lex"

export type Lex<State extends {} = {}> = {
  state: State
  elements: LexElement[]
  keysDown: KeyBuffer
  append: (element: LexElement, isChild?: boolean) => boolean
  remove: (element: LexElement) => boolean
}

export type LexProps<State extends {}> = {
  state: State
  elements?: LexElement[]
  backgroundColor?: LexColor
}

export const Lex = <State extends {} = {}>(props: LexProps<State>): Lex<State> => {

  let ready = false

  const lex: Lex<State> = {
    state: props.state,
    elements: [],
    keysDown: KeyBuffer(),
    append: (element: LexElement, isChild = false) => {
      lex.elements.push(element)
      element.lex = lex

      if (!isChild) document.body.appendChild(element.e)

      if (element.children) {
        for (const child of element.children) {
          element.e.appendChild(child.e)
          lex.append(child, true)
        }
      }

      return true
    },
    remove: (element: LexElement) => {
      const index = lex.elements.indexOf(element)
      if (index === -1) return false

      lex.elements.splice(index, 1)
      if (element.e.parentElement) element.e.parentElement.removeChild(element.e)

      return true
    }
  }

  const update = () => {
    requestAnimationFrame(update)

    if (!ready && document.body) {
      document.body.style.backgroundColor = props.backgroundColor ?? "black"
      document.body.style.overflowX = "hidden"
      document.body.style.overflowY = "hidden"

      if (props.elements) {
        for (const element of props.elements) {
          lex.append(element)
        }
      }

      ready = true
    }

    for (const element of lex.elements) {
      element.update?.()

      if (element.children) {
        for (const child of element.children) {
          child.update?.()
        }
      }

      lex.keysDown.update()
    }
  }

  document.addEventListener("keydown", (event) => {
    if (document.hasFocus()) {
      let key = event.key.toLowerCase()

      // prevent defaults
      // if (charactersPreventDefault.has(key)) event.preventDefault()

      // add to buffer
      if (!lex.keysDown.get(key)) {
        lex.keysDown.push({ key, hold: 0 })
      }
    }
  })

  document.addEventListener("keyup", (event) => {
    const key = event.key.toLowerCase()

    lex.keysDown.remove(key)
  })

  requestAnimationFrame(update)

  return lex
}
