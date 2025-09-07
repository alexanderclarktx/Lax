export type KeyInfo = { key: string, hold: number }

export type KeyBuffer = {
  all: () => KeyInfo[]
  get: (key: string) => KeyInfo | undefined
  copy: () => KeyBuffer
  clear: () => void
  push: (km: KeyInfo) => void
  remove: (key: string) => void
  updateHold: () => void
}

export const KeyBuffer = (b?: KeyInfo[]): KeyBuffer => {
  let buffer: KeyInfo[] = b ? [...b] : []

  return {
    all: () => [...buffer],
    get: (key: string) => {
      return buffer.find((b) => b.key === key)
    },
    copy: () => KeyBuffer(buffer),
    clear: () => {
      buffer = []
    },
    push: (km: KeyInfo) => {
      if (!buffer.find((b) => b.key === km.key)) return buffer.push(km)
    },
    remove: (key: string) => {
      buffer = buffer.filter((b) => b.key !== key)
    },
    updateHold: () => {
      for (const b of buffer) {
        b.hold += 1
      }
    }
  }
}
