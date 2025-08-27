import { Lax, LaxDiv, XY } from "@lax"

type State = {
  position: XY,
  velocity: { x: number, y: number },
  radius: number
  gravity: number
}

const lax = Lax<State>({
  position: { x: window.innerWidth / 2, y: window.innerHeight / 2 },
  velocity: { x: Math.random() * 5 - 10, y: Math.random() * 5 },
  radius: 10,
  gravity: 0.1
})

const ball = LaxDiv({
  backgroundColor: "green",
  width: `${lax.state.radius * 2}px`,
  height: `${lax.state.radius * 2}px`,
  borderRadius: "50%",
  border: "1px solid white"
},
  (div) => {
    lax.state.velocity.y += lax.state.gravity

    lax.state.position.y += lax.state.velocity.y
    lax.state.position.x += lax.state.velocity.x

    if (lax.state.position.y + lax.state.radius > window.innerHeight) {
      lax.state.position.y = window.innerHeight - lax.state.radius
      lax.state.velocity.y *= -1
    }

    if (lax.state.position.x + lax.state.radius > window.innerWidth) {
      lax.state.position.x = window.innerWidth - lax.state.radius
      lax.state.velocity.x *= -1
    }

    if (lax.state.position.x < 0) {
      lax.state.position.x = 0
      lax.state.velocity.x *= -1
    }

    div.style.top = `${lax.state.position.y}px`
    div.style.left = `${lax.state.position.x}px`
  }
)

lax.append(ball)
