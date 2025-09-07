import { CSS, Lax } from "@lax"

export type LaxElement<E extends HTMLElement = HTMLElement> = {
  lax: Lax | undefined
  e: E
  update: undefined | (() => void)
  callbacks: undefined | {
    onPointerDown?: () => void
    onPointerOver?: () => void
    onPointerOut?: () => void
  },
  children: LaxElement[]
}

export type LaxElementProps = {
  style?: Partial<CSS>
  update?: () => void
  callbacks?: {
    onPointerDown?: () => void
    onPointerOver?: () => void
    onPointerOut?: () => void
  },
  children?: LaxElement[]
}
