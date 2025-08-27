// src/Lax.ts
var Lax = (state) => {
  document.body.style.backgroundColor = "black";
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
      element.update?.(element.e);
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
var LaxDiv = (style = {}, update) => {
  const div = document.createElement("div");
  Object.assign(div.style, defaults);
  Object.assign(div.style, style);
  div.oncontextmenu = (e) => e.preventDefault();
  if (style.touchAction === undefined) {
    div.ontouchstart = (e) => e.preventDefault();
    div.ontouchend = (e) => e.preventDefault();
    div.ontouchmove = (e) => e.preventDefault();
    div.ontouchcancel = (e) => e.preventDefault();
  }
  return { e: div, update };
};
// examples/ball.ts
var lax = Lax({
  position: { x: window.innerWidth / 2, y: window.innerHeight / 2 },
  velocity: { x: Math.random() * 5 - 10, y: Math.random() * 5 },
  radius: 10,
  gravity: 0.1
});
var ball = LaxDiv({
  backgroundColor: "green",
  width: `${lax.state.radius * 2}px`,
  height: `${lax.state.radius * 2}px`,
  borderRadius: "50%",
  border: "1px solid white"
}, (div) => {
  lax.state.velocity.y += lax.state.gravity;
  lax.state.position.y += lax.state.velocity.y;
  lax.state.position.x += lax.state.velocity.x;
  if (lax.state.position.y + lax.state.radius > window.innerHeight) {
    lax.state.position.y = window.innerHeight - lax.state.radius;
    lax.state.velocity.y *= -1;
  }
  if (lax.state.position.x + lax.state.radius > window.innerWidth) {
    lax.state.position.x = window.innerWidth - lax.state.radius;
    lax.state.velocity.x *= -1;
  }
  if (lax.state.position.x < 0) {
    lax.state.position.x = 0;
    lax.state.velocity.x *= -1;
  }
  div.style.top = `${lax.state.position.y}px`;
  div.style.left = `${lax.state.position.x}px`;
});
lax.append(ball);
