// src/Lax.ts
var Lax = (state) => {
  document.body.style.backgroundColor = "black";
  document.body.style.overflowX = "hidden";
  document.body.style.overflowY = "hidden";
  let children = [];
  const lax = {
    state,
    append: (element) => {
      document.body.appendChild(element.e);
      children.push(element);
      return true;
    }
  };
  const loop = () => {
    requestAnimationFrame(loop);
    for (const element of children) {
      element.update?.(element.e, element.state);
    }
  };
  requestAnimationFrame(loop);
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
  return { e: div, update: props.update, state: props.state };
};
// docs/ball.ts
var lax = Lax({});
var Ball = (color) => LaxDiv({
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
      state.velocity.y *= -1;
    }
    if (state.position.y + state.radius * 2 > window.innerHeight) {
      state.position.y = window.innerHeight - state.radius * 2;
      state.velocity.y *= -1;
    }
  }
});
lax.append(Ball("#00ffaa"));
lax.append(Ball("#ffaa00"));
lax.append(Ball("#aa00ff"));
lax.append(Ball("#ff00aa"));
