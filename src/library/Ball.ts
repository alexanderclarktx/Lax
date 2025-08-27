import { LaxColor, LaxDiv, XY } from "@lax"

type BallState = {
  position: XY
  velocity: XY
  radius: number
  gravity: number
}

export const Ball = (color: LaxColor) => LaxDiv<BallState>({
  state: {
    position: { x: 0, y: 0 },
    velocity: { x: Math.random() * 2 - 4, y: Math.random() * 5 - 10 },
    radius: 20,
    gravity: 0.05
  },
  style: {
    backgroundColor: color,
    borderRadius: "50%",
    border: "1px solid white"
  },
  update: (div, state) => {
    // shape
    div.style.width = `${state.radius * 2}px`
    div.style.height = `${state.radius * 2}px`

    // position
    div.style.top = `${state.position.y}px`
    div.style.left = `${state.position.x}px`

    // gravity
    state.velocity.y += state.gravity

    // velocity
    state.position.x += state.velocity.x
    state.position.y += state.velocity.y

    // bounces

    if (state.position.x < 0) {
      state.position.x = 0
      state.velocity.x *= -1
    }

    if (state.position.x + state.radius * 2 > window.innerWidth) {
      state.position.x = window.innerWidth - state.radius * 2
      state.velocity.x *= -1
    }

    if (state.position.y < 0) {
      state.position.y = 0
      state.velocity.y *= -1
    }

    if (state.position.y + state.radius * 2 > window.innerHeight) {
      state.position.y = window.innerHeight - state.radius * 2
      state.velocity.y *= -1
    }
  }
})
