import { Lax, LaxDiv, XY } from "@lax"

type State = {
}

const lax = Lax<State>({})

type BallState = {
  position: XY,
  velocity: { x: number, y: number },
  radius: number
  gravity: number
}

const ball = LaxDiv<BallState>({
  state: {
    position: { x: 0, y: 0 },
    velocity: { x: 0, y: 0 },
    radius: 20,
    gravity: 0.5
  },
  style: {
    backgroundColor: "#00ffaa",
    // width: `${lax.state.radius * 2}px`,
    // height: `${lax.state.radius * 2}px`,
    borderRadius: "50%",
    border: "1px solid white"
  },
  update: (div, state) => {

    div.style.width = `${state.radius * 2}px`
    div.style.height = `${state.radius * 2}px`
    div.style.top = `${state.position.y}px`
    div.style.left = `${state.position.x}px`

  }

  // lax.state.velocity.y += lax.state.gravity

  // lax.state.position.y += lax.state.velocity.y
  // lax.state.position.x += lax.state.velocity.x

  // if (lax.state.position.y + lax.state.radius > window.innerHeight) {
  //   lax.state.position.y = window.innerHeight - lax.state.radius
  //   lax.state.velocity.y *= -1
  // }

  // if (lax.state.position.x + lax.state.radius > window.innerWidth) {
  //   lax.state.position.x = window.innerWidth - lax.state.radius
  //   lax.state.velocity.x *= -1
  // }

  // if (lax.state.position.x < 0) {
  //   lax.state.position.x = 0
  //   lax.state.velocity.x *= -1
  // }

  // div.style.top = `${lax.state.position.y}px`
  // div.style.left = `${lax.state.position.x}px`
}
)

lax.append(ball)
