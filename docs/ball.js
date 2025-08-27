// src/Lax.ts
var Lax = (state) => {
  let ready = false;
  const lax = {
    state,
    elements: [],
    append: (element) => {
      document.body.appendChild(element.e);
      lax.elements.push(element);
      return true;
    }
  };
  const update = () => {
    requestAnimationFrame(update);
    if (!ready && document.body) {
      document.body.style.backgroundColor = "black";
      document.body.style.overflowX = "hidden";
      document.body.style.overflowY = "hidden";
      ready = true;
    }
    for (const element of lax.elements) {
      element.update?.(element.e, element.state);
    }
  };
  requestAnimationFrame(update);
  return lax;
};
// src/elements/LaxDiv.ts
var defaults = {
  position: "absolute",
  scrollbarWidth: "none",
  msOverflowStyle: "none",
  outline: "none",
  touchAction: "none"
};
var LaxDiv = (props) => {
  const div = document.createElement("div");
  Object.assign(div.style, defaults);
  Object.assign(div.style, props.style);
  div.oncontextmenu = (e) => e.preventDefault();
  if (props.style?.touchAction === undefined) {
    div.ontouchstart = (e) => e.preventDefault();
    div.ontouchend = (e) => e.preventDefault();
    div.ontouchmove = (e) => e.preventDefault();
    div.ontouchcancel = (e) => e.preventDefault();
  }
  if (props.callbacks) {
    div.onpointerdown = props.callbacks.onPointerDown;
  }
  return { e: div, update: props.update, state: props.state, callbacks: props.callbacks };
};
// src/library/Ball.ts
var Ball = (color) => {
  const ball = LaxDiv({
    state: {
      position: { x: 0, y: 0 },
      velocity: { x: Math.random() - 2, y: Math.random() * 5 - 10 },
      radius: 20,
      gravity: 0.05,
      frozen: false
    },
    style: {
      backgroundColor: color,
      borderRadius: "50%",
      border: "1px solid white",
      pointerEvents: "auto"
    },
    callbacks: {
      onPointerDown: () => {
        ball.state.frozen = !ball.state.frozen;
        console.log(ball.state.frozen);
      }
    },
    update: (div, state) => {
      if (state.frozen)
        return;
      div.style.width = `${state.radius * 2}px`;
      div.style.height = `${state.radius * 2}px`;
      div.style.top = `${state.position.y}px`;
      div.style.left = `${state.position.x}px`;
      state.velocity.y += state.gravity;
      state.position.x += state.velocity.x;
      state.position.y += state.velocity.y;
      if (state.position.x < 0) {
        state.position.x = 0;
        state.velocity.x *= -1;
      }
      if (state.position.x + state.radius * 2 > window.innerWidth) {
        state.position.x = window.innerWidth - state.radius * 2;
        state.velocity.x *= -1;
      }
      if (state.position.y < 0) {
        state.position.y = 0;
        state.velocity.y *= -0.9;
      }
      if (state.position.y + state.radius * 2 > window.innerHeight) {
        state.position.y = window.innerHeight - state.radius * 2;
        state.velocity.y *= -0.9;
      }
    }
  });
  return ball;
};
// docs/ball.ts
var lax = Lax({});
lax.append(Ball("#00ffaa"));
lax.append(Ball("#ffaa00"));
lax.append(Ball("#aa00ff"));
lax.append(Ball("#ff00aa"));
