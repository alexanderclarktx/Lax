import { LaxElement } from "@lax"

export type Lax<State extends {} = {}> = {
  state: State
  append: (element: LaxElement) => boolean
}

export const Lax = <State extends {} = {}>(state: State): Lax<State> => {

  document.body.style.backgroundColor = "black"

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
      element.update?.(element.e)
    }
  }
  requestAnimationFrame(loop)

  return lax
}
