import { LaxElement } from "@lax"

export type Lax<State extends {} = {}> = {
  state: State
  append: (...element: LaxElement[]) => boolean
}

export const Lax = <State extends {} = {}>(state: State): Lax<State> => {

  let ready = false

  // document.body.style.backgroundColor = "black"
  // document.body.style.overflowX = "hidden"
  // document.body.style.overflowY = "hidden"

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

    if (!ready) {
      if (document.body) {
        document.body.style.backgroundColor = "black"
        document.body.style.overflowX = "hidden"
        document.body.style.overflowY = "hidden"
        ready = true
      }
    }

    for (const element of children) {
      element.update?.(element.e, element.state)
    }
  }
  requestAnimationFrame(loop)

  return lax
}
