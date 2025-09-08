import { CSS, Lax } from "@lax"

type Update = () => void

export type LaxElement<E extends HTMLElement = HTMLElement> = {
  lax: Lax | undefined
  e: E
  update: undefined | Update
  callbacks: undefined | {
    onPointerDown?: () => void
    onPointerOver?: () => void
    onPointerOut?: () => void
  },
  children: LaxElement[]
}

export type LaxElementProps = {
  style?: Partial<CSS>
  update?: Update
  callbacks?: {
    onPointerDown?: () => void
    onPointerOver?: () => void
    onPointerOut?: () => void
  },
  children?: LaxElement[]
}
