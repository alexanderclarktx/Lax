export type CSS = Partial<{
  alignItems: "center" | "flex-start" | "flex-end" | "stretch"
  alignSelf: "flex-end" | "center"
  backgroundColor: LaxColor
  border: string
  borderBottom: string
  borderImage: `linear-gradient(${string}) ${number}`
  borderRadius: `${number}px` | `${number}%`
  bottom: `${number}%` | `${number}px`
  boxSizing: "border-box" | "content-box"
  clipPath: string
  color: LaxColor
  cursor: "pointer" | "default" | "not-allowed"
  display: "block" | "inline-block" | "flex" | "inline-flex" | "none"
  flex: number | `${number} ${number} auto`
  flexDirection: "row" | "column" | "row-reverse" | "column-reverse"
  flexShrink: 0 | 1 | 2
  float: "left" | "right" | "none"
  fontFamily: "Courier New" | "Arial"
  fontSize: `${number}px` | `${number}em`
  fontWeight: "normal" | "bold" | "bolder" | "lighter"
  height: `${number}px` | `${number}%` | "auto" | `${number}vh` | `${number}dvh` | `calc(${string})`
  justifyContent: "center" | "flex-start" | "flex-end" | "space-between" | "space-around"
  left: `${number}%` | `${number}px` | `${number}dvh`
  lineHeight: `${number}px` | `${number}%`
  margin: `${number}px` | `${number}%` | "0 auto"
  marginBottom: `${number}px` | `${number}%` | "env(safe-area-inset-bottom)"
  marginLeft: `${number}px` | `${number}%` | "env(safe-area-inset-left)" | "auto"
  marginRight: `${number}px` | `${number}%` | "env(safe-area-inset-right)" | "auto"
  marginTop: `${number}px` | `${number}%` | "env(safe-area-inset-top)"
  maxHeight: `${number}%` | `${number}px` | `${number}dvh`
  maxWidth: `${number}%` | `${number}px`
  minHeight: `${number}px` | `${number}%` | `${number}dvh` | 0
  minWidth: `${number}px` | `${number}%`
  msOverflowStyle: "none"
  outline: "none"
  overflow: "visible" | "hidden" | "scroll" | "auto"
  overflowY: "visible" | "hidden" | "scroll" | "auto"
  padding: `${number}px` | `${number}%`,
  paddingBottom: `${number}px` | `${number}%`
  paddingLeft: `${number}px` | `${number}%`
  paddingRight: `${number}px` | `${number}%`
  paddingTop: `${number}px` | `${number}%`
  pointerEvents: "none" | "auto"
  position: "absolute" | "relative" | "fixed" | "sticky" | "static"
  right: `${number}%` | `${number}px`
  scrollbarWidth: "auto" | "thin" | "none"
  textAlign: "left" | "center" | "right" | "justify"
  textDecoration: "none" | "underline" | "line-through"
  textDecorationStyle: "solid" | "dashed" | "dotted"
  textShadow: `${number}px ${number}px ${number}px rgba(${number}, ${number}, ${number}, ${number})`
  top: `${number}%` | `${number}px` | `${number}dvh`
  touchAction: "none" | "pan-x" | "pan-y" | "pan-x pan-y" | "manipulation" | "auto"
  transform: `translate(${number}%)` | `translate(${number}%, ${number}%)`
  userSelect: "none" | "auto" | "text" | "all"
  visibility: "visible" | "hidden"
  whiteSpace: "normal" | "nowrap" | "pre" | "pre-wrap" | "pre-line"
  width: `${number}px` | `${number}%` | "auto" | `${number}vw`
  wordBreak: "normal" | "break-word" | "break-all"
  zIndex: number
}>

type PrimaryColor = "red" | "green" | "blue" | "yellow" | "purple" | "orange"
export type LaxColor = PrimaryColor | `#${string}` | `rgba(${number}, ${number}, ${number}, ${number})`
