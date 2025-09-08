import { CSS, Lax } from "@lax"

type Update = () => void

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

export const LaxElement = <E extends HTMLElement>(tag: keyof HTMLElementTagNameMap, defaults: CSS) => (props: LaxElementProps): LaxElement<E> => {
  const element = document.createElement(tag) as E

  Object.assign(element.style, defaults)
  Object.assign(element.style, props.style)

  element.oncontextmenu = (e) => e.preventDefault() // TODO

  if (props.style?.touchAction === undefined) {
    element.ontouchstart = (e) => e.preventDefault()
    element.ontouchend = (e) => e.preventDefault()
    element.ontouchmove = (e) => e.preventDefault()
    element.ontouchcancel = (e) => e.preventDefault()
  }

  if (props.callbacks) {
    const { onPointerDown, onPointerOver, onPointerOut } = props.callbacks
    if (onPointerDown) element.onpointerdown = onPointerDown
    if (onPointerOver) element.onpointerover = onPointerOver
    if (onPointerOut) element.onpointerout = onPointerOut
  }

  return {
    lax: undefined,
    e: element,
    update: props.update,
    callbacks: props.callbacks,
    children: props.children || []
  }
}

export type LaxDiv = LaxElement<HTMLDivElement>
export type LaxCanvas = LaxElement<HTMLCanvasElement>
export type LaxImage = LaxElement<HTMLImageElement>
export type LaxAnchor = LaxElement<HTMLAnchorElement>

export const LaxDiv = LaxElement<HTMLDivElement>("div", {
  position: "absolute",
  scrollbarWidth: "none",
  msOverflowStyle: "none",
  outline: "none",
  touchAction: "none"
})

export const LaxCanvas = LaxElement<HTMLCanvasElement>("canvas", {
  position: "absolute",
  outline: "none",
  touchAction: "none"
})

export const LaxImage = LaxElement<HTMLImageElement>("img", {
  position: "absolute",
  outline: "none",
  touchAction: "none",
  userSelect: "none",
  pointerEvents: "none"
})

export const LaxAnchor = LaxElement<HTMLAnchorElement>("a", {
  position: "absolute",
  outline: "none",
  touchAction: "none"
})
