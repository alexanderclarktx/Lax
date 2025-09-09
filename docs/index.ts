import { Lex, Ball } from "@piggo-gg/lex"

const app = Lex({
  state: {},
  elements: [
    Ball("#00ffaa"), Ball("#ffaa00"), Ball("#aa00ff"), Ball("#ff00aa")
  ],
  backgroundColor: "#112233"
})
