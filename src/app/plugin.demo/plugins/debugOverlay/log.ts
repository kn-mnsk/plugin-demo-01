import { DebugEvent } from "./bus"

// debugOverlay/log.ts
export function renderLog(container: HTMLDivElement, event: DebugEvent) {
  const entry = document.createElement('div')
  entry.className = 'debug-log-entry'

  const header = document.createElement('div')
  header.className = 'debug-log-header'
  header.textContent = `[${(event.duration || 0).toFixed(1)}ms] ${event.plugin}.${event.hook}`
  entry.appendChild(header)

  if (event.error) {
    const err = document.createElement('pre')
    err.className = 'debug-log-error'
    err.textContent = event.error.stack || event.error.message
    entry.appendChild(err)
  } else {
    const payload = document.createElement('pre')
    payload.className = 'debug-log-payload'
    payload.textContent = JSON.stringify(event.payload, null, 2)
    entry.appendChild(payload)
  }

  container.appendChild(entry)
  container.scrollTop = container.scrollHeight
}
