import { CSS } from "@lax"

export type LaxElement<E extends HTMLElement = HTMLElement, S extends {} = {}> = {
  e: E
  state: S
  update: undefined | LaxUpdate<E, S>
}

export type LaxElementProps<LE extends LaxElement> = {
  style?: Partial<CSS>
  update?: LaxUpdate<LE["e"], LE["state"]>
  state: LE["state"]
}

export type LaxUpdate<E extends HTMLElement, S extends {}> = (e: E, state: S) => void
