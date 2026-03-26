// debugOverlay/bus.ts
export type DebugEvent = {
  plugin: string
  hook: string
  timestamp: number
  duration?: number
  payload?: any
  result?: any
  error?: Error
}

type Listener = (event: DebugEvent) => void

const listeners = new Set<Listener>()

export const debugBus = {
  emit(event: DebugEvent) {
    listeners.forEach(l => l(event))
  },
  subscribe(listener: Listener) {
    listeners.add(listener)
    return () => listeners.delete(listener)
  }
}
