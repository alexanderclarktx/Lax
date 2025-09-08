import { Lax, Ball } from "@lax"

const app = Lax({
  state: {},
  elements: [
    Ball("#00ffaa"), Ball("#ffaa00"), Ball("#aa00ff"), Ball("#ff00aa")
  ],
  backgroundColor: "#333355"
})
