export type LaxElement<E extends HTMLElement = HTMLElement> = {
  e: E
  update: undefined | LaxUpdate<E>
}

export type LaxUpdate<E extends HTMLElement> = (e: E) => void
