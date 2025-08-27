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
// examples/ball.ts
var lax = Lax({});
var ball = LaxDiv({
  state: {
    position: { x: 0, y: 0 },
    velocity: { x: 0, y: 0 },
    radius: 20,
    gravity: 0.5
  },
  style: {
    backgroundColor: "#00ffaa",
    borderRadius: "50%",
    border: "1px solid white"
  },
  update: (div, state) => {
    div.style.width = `${state.radius * 2}px`;
    div.style.height = `${state.radius * 2}px`;
    div.style.top = `${state.position.y}px`;
    div.style.left = `${state.position.x}px`;
  }
});
lax.append(ball);
