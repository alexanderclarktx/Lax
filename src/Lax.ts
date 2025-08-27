import { LaxElement } from "@lax"

export type Lax<State extends {} = {}> = {
  state: State
  elements: LaxElement[]
  append: (...element: LaxElement[]) => boolean
}

export const Lax = <State extends {} = {}>(state: State): Lax<State> => {

  let ready = false

  const lax: Lax<State> = {
    state,
    elements: [],
    append: (element: LaxElement) => {
      document.body.appendChild(element.e)
      lax.elements.push(element)
      return true
    }
  }

  const update = () => {
    requestAnimationFrame(update)

    if (!ready && document.body) {
      document.body.style.backgroundColor = "black"
      document.body.style.overflowX = "hidden"
      document.body.style.overflowY = "hidden"
      ready = true
    }

    for (const element of lax.elements) {
      element.update?.(element.e, element.state)
    }
  }

  requestAnimationFrame(update)

  return lax
}
