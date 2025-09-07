import { CSS, LaxElement, LaxElementProps } from "@lax"

const defaults: CSS = {
  position: "absolute",
  scrollbarWidth: "none",
  msOverflowStyle: "none",
  outline: "none",
  touchAction: "none"
}

export type LaxDiv<S extends {}> = LaxElement<HTMLDivElement>

export const LaxDiv = <S extends {}>(props: LaxElementProps<LaxDiv<S>>): LaxDiv<S> => {
  const div = document.createElement("div")

  Object.assign(div.style, defaults)
  Object.assign(div.style, props.style)

  div.oncontextmenu = (e) => e.preventDefault()

  if (props.style?.touchAction === undefined) {
    div.ontouchstart = (e) => e.preventDefault()
    div.ontouchend = (e) => e.preventDefault()
    div.ontouchmove = (e) => e.preventDefault()
    div.ontouchcancel = (e) => e.preventDefault()
  }

  if (props.callbacks) {
    const { onPointerDown, onPointerOver, onPointerOut } = props.callbacks
    if (onPointerDown) div.onpointerdown = onPointerDown
    if (onPointerOver) div.onpointerover = onPointerOver
    if (onPointerOut) div.onpointerout = onPointerOut
  }

  return {
    lax: undefined,
    e: div,
    update: props.update,
    callbacks: props.callbacks
  }
}
