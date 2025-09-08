<div align="center" style="font:">

  __Lax__ is a small web runtime. Write your entire webapp with TypeScript.
</div>

### Lax syntax

```ts
const app = Lax({
  state: {},
  elements: [
    Ball("#00ffaa"), Ball("#ffaa00"), Ball("#aa00ff"), Ball("#ff00aa")
  ]
})
```

### running the repo

```bash
# install dependencies
bun install

# run the webapp with hot code reloading
bun dev
```
