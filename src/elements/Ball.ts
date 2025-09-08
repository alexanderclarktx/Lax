import { LexColor, LexDiv } from "@piggo/lex"

export const Ball = (color: LexColor): LexDiv => {

  // TODO should be a component
  const state = {
    position: { x: Math.random() * window.innerWidth, y: Math.random() * window.innerHeight / 2 },
    velocity: { x: Math.random() * 2 - 4, y: 0 },
    radius: 8,
    gravity: 0.04,
    frozen: false
  }

  const ball = LexDiv({
    style: {
      backgroundColor: color,
      borderRadius: "50%",
      border: "2px solid white",
      pointerEvents: "auto"
    },
    callbacks: {
      onPointerDown: () => {
        ball.lex?.remove(ball)
      },
      onPointerOver: () => {
        state.frozen = true
      },
      onPointerOut: () => {
        state.frozen = false
      }
    },
    update: () => {
      if (state.frozen) return

      const div = ball.e

      // shape
      div.style.width = `${state.radius}dvh`
      div.style.height = `${state.radius}dvh`

      // position
      div.style.top = `${state.position.y}px`
      div.style.left = `${state.position.x}px`

      // gravity
      state.velocity.y += state.gravity

      // velocity
      state.position.x += state.velocity.x
      state.position.y += state.velocity.y

      // bounces

      const { width, height } = div.getBoundingClientRect()

      if (state.position.x < 0) {
        state.position.x = 0
        state.velocity.x *= -1
      }

      if (state.position.x + width > window.innerWidth) {
        state.position.x = window.innerWidth - width
        state.velocity.x *= -1
      }

      if (state.position.y < 0) {
        state.position.y = 0
        state.velocity.y *= -1
      }

      if (state.position.y + height > window.innerHeight) {
        state.position.y = window.innerHeight - height
        state.velocity.y *= -1
      }
    }
  })

  return ball
}
