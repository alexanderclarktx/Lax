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
    const { onPointerDown, onPointerOver, onPointerOut } = props.callbacks;
    if (onPointerDown)
      div.onpointerdown = onPointerDown;
    if (onPointerOver)
      div.onpointerover = onPointerOver;
    if (onPointerOut)
      div.onpointerout = onPointerOut;
  }
  return { e: div, update: props.update, state: props.state, callbacks: props.callbacks };
};
// src/library/Ball.ts
var Ball = (color) => {
  const ball = LaxDiv({
    state: {
      position: { x: 0, y: 0 },
      velocity: { x: Math.random() * 2 - 4, y: 0 },
      radius: 8,
      gravity: 0.04,
      frozen: false
    },
    style: {
      backgroundColor: color,
      borderRadius: "50%",
      border: "2px solid white",
      pointerEvents: "auto"
    },
    callbacks: {
      onPointerOver: () => {
        ball.state.frozen = true;
      },
      onPointerOut: () => {
        ball.state.frozen = false;
      }
    },
    update: (div, state) => {
      if (state.frozen)
        return;
      div.style.width = `${state.radius}dvh`;
      div.style.height = `${state.radius}dvh`;
      div.style.top = `${state.position.y}px`;
      div.style.left = `${state.position.x}px`;
      state.velocity.y += state.gravity;
      state.position.x += state.velocity.x;
      state.position.y += state.velocity.y;
      const { width, height } = div.getBoundingClientRect();
      if (state.position.x < 0) {
        state.position.x = 0;
        state.velocity.x *= -1;
      }
      if (state.position.x + width > window.innerWidth) {
        state.position.x = window.innerWidth - width;
        state.velocity.x *= -1;
      }
      if (state.position.y < 0) {
        state.position.y = 0;
        state.velocity.y *= -1;
      }
      if (state.position.y + height > window.innerHeight) {
        state.position.y = window.innerHeight - height;
        state.velocity.y *= -1;
      }
    }
  });
  return ball;
};
// docs/index.ts
var lax = Lax({});
lax.append(Ball("#00ffaa"));
lax.append(Ball("#ffaa00"));
lax.append(Ball("#aa00ff"));
lax.append(Ball("#ff00aa"));
