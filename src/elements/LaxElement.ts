import { CSS, Lax } from "@lax"

export type LaxElement<E extends HTMLElement = HTMLElement> = {
  lax: Lax | undefined
  e: E
  update: undefined | LaxUpdate<E>
  callbacks: undefined | {
    onPointerDown?: () => void
    onPointerOver?: () => void
    onPointerOut?: () => void
  },
  children: LaxElement[]
}

export type LaxElementProps<LE extends LaxElement> = {
  style?: Partial<CSS>
  update?: LaxUpdate<LE["e"]>
  callbacks?: {
    onPointerDown?: () => void
    onPointerOver?: () => void
    onPointerOut?: () => void
  },
  children?: LaxElement[]
}

export type LaxUpdate<E extends HTMLElement> = (e: E, lax: Lax) => void
