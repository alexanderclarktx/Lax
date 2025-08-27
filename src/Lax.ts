import { LaxElement } from "@lax"

export type Lax<State extends {} = {}> = {
  state: State
  append: (element: LaxElement) => boolean
}

export const Lax = <State extends {} = {}>(state: State): Lax<State> => {

  document.body.style.backgroundColor = "black"
  document.body.style.overflowX = "hidden"
  document.body.style.overflowY = "hidden"

  let children: LaxElement[] = []

  const lax: Lax<State> = {
    state,
    append: (element: LaxElement) => {
      document.body.appendChild(element.e)
      children.push(element)
      return true
    }
  }

  const loop = () => {
    requestAnimationFrame(loop)

    for (const element of children) {
      element.update?.(element.e, element.state)
    }
  }
  requestAnimationFrame(loop)

  return lax
}
