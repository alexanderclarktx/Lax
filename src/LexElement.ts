import { CSS, Lex } from "@piggo-gg/lex"

type Update = () => void

export type LexElementProps = {
  style?: Partial<CSS>
  update?: Update
  callbacks?: {
    onPointerDown?: () => void
    onPointerOver?: () => void
    onPointerOut?: () => void
  },
  children?: LexElement[]
  // todo text
}

export type LexElement<E extends HTMLElement = HTMLElement> = {
  lex: Lex | undefined
  e: E
  update: undefined | Update
  callbacks: undefined | {
    onPointerDown?: () => void
    onPointerOver?: () => void
    onPointerOut?: () => void
  },
  children: LexElement[]
}

export const LexElement = <E extends HTMLElement>(tag: keyof HTMLElementTagNameMap, defaults: CSS) => (props: LexElementProps = {}): LexElement<E> => {
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
    lex: undefined,
    e: element,
    update: props.update,
    callbacks: props.callbacks,
    children: props.children ?? []
  }
}

export type LexDiv = LexElement<HTMLDivElement>
export type LexCanvas = LexElement<HTMLCanvasElement>
export type LexImage = LexElement<HTMLImageElement>
export type LexAnchor = LexElement<HTMLAnchorElement>

export const LexDiv = LexElement<HTMLDivElement>("div", {
  position: "absolute",
  scrollbarWidth: "none",
  msOverflowStyle: "none",
  outline: "none",
  touchAction: "none"
})

export const LexCanvas = LexElement<HTMLCanvasElement>("canvas", {
  position: "absolute",
  outline: "none",
  touchAction: "none"
})

export const LexImage = LexElement<HTMLImageElement>("img", {
  position: "absolute",
  outline: "none",
  touchAction: "none",
  userSelect: "none",
  pointerEvents: "none"
})

export const LexAnchor = LexElement<HTMLAnchorElement>("a", {
  position: "absolute",
  outline: "none",
  touchAction: "none"
})
