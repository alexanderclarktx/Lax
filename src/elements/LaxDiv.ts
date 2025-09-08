import { CSS, LaxElement, LaxElementProps } from "@lax"

const defaults: CSS = {
  position: "absolute",
  scrollbarWidth: "none",
  msOverflowStyle: "none",
  outline: "none",
  touchAction: "none"
}

export type LaxDiv = LaxElement<HTMLDivElement>

export const LaxDiv = LaxElement<HTMLDivElement>("div", defaults)
