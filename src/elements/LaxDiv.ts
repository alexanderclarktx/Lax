import { CSS, LaxElement, LaxUpdate } from "@lax"

const defaults: CSS = {
  position: "absolute",
  scrollbarWidth: "none",
  msOverflowStyle: "none",
  outline: "none",
  touchAction: "none"
}

export type LaxDiv = LaxElement<HTMLDivElement>

export const LaxDiv = (style: CSS = {}, update?: LaxUpdate<HTMLDivElement>): LaxDiv => {
  const div = document.createElement("div")

  Object.assign(div.style, defaults)
  Object.assign(div.style, style)

  div.oncontextmenu = (e) => e.preventDefault()

  if (style.touchAction === undefined) {
    div.ontouchstart = (e) => e.preventDefault()
    div.ontouchend = (e) => e.preventDefault()
    div.ontouchmove = (e) => e.preventDefault()
    div.ontouchcancel = (e) => e.preventDefault()
  }

  return { e: div, update }
}

// export type RefreshableDiv = { div: LaxDiv, update: () => void }
