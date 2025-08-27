export type Lax<State extends {} = {}> = {
  state: State
}

export const Lax = <State extends {} = {}>(state: State): Lax<State> => {
  return {
    state
  }
}
