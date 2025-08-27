import { CSS } from "@lax"

export type LaxElement<E extends HTMLElement = HTMLElement, S extends {} = {}> = {
  e: E
  state: S
  update: undefined | LaxUpdate<E, S>
  callbacks: undefined | {
    onPointerDown?: () => void
    onPointerOver?: () => void
    onPointerOut?: () => void
  }
}

export type LaxElementProps<LE extends LaxElement> = {
  style?: Partial<CSS>
  update?: LaxUpdate<LE["e"], LE["state"]>
  state: LE["state"]
  callbacks?: {
    onPointerDown?: () => void
    onPointerOver?: () => void
    onPointerOut?: () => void
  }
}

export type LaxUpdate<E extends HTMLElement, S extends {}> = (e: E, state: S) => void
