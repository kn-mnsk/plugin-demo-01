// debugOverlay/index.ts
import { debugBus, DebugEvent } from './bus'
import { renderTimeline } from './timeline'
import { renderLog } from './log'
import { renderPanel } from './panel'

export function mountDebugOverlay() {
  const root = document.createElement('div')
  root.id = 'debug-overlay'
  document.body.appendChild(root)

  const timeline = document.createElement('div')
  timeline.className = 'debug-timeline'
  root.appendChild(timeline)

  const log = document.createElement('div')
  log.className = 'debug-log'
  root.appendChild(log)

  const panel = document.createElement('div')
  panel.className = 'debug-panel'
  root.appendChild(panel)

  const events: DebugEvent[] = []

  debugBus.subscribe(event => {
    events.push(event)
    renderTimeline(timeline, events)
    renderLog(log, event)
    renderPanel(panel, events)
  })
}
