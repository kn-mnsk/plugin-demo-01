// debugOverlay/panel.ts
import { DebugEvent } from './bus'


export function renderPanel(container: HTMLDivElement, events: DebugEvent[]) {
  container.innerHTML = ''

  const stats: any = {}
  for (const e of events) {
    if (!stats[e.plugin]) {
      stats[e.plugin] = { calls: 0, total: 0, errors: 0 }
    }
    stats[e.plugin].calls++
    if (e.duration) stats[e.plugin].total += e.duration
    if (e.error) stats[e.plugin].errors++
  }

  Object.entries<any>(stats).forEach(([plugin, s]) => {
    const row = document.createElement('div')
    row.className = 'debug-panel-row'

    row.innerHTML = `
      <div class="plugin-name">${plugin}</div>
      <div class="plugin-calls">${s.calls} calls</div>
      <div class="plugin-avg">${(s.total / s.calls).toFixed(1)}ms avg</div>
      <div class="plugin-errors">${s.errors} errors</div>
    `

    container.appendChild(row)
  })
}
