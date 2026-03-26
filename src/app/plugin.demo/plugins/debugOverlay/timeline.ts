import { DebugEvent } from "./bus"

// debugOverlay/timeline.ts
export function renderTimeline(container: HTMLDivElement, events: DebugEvent[]) {
  container.innerHTML = ''

  const maxDuration = Math.max(...events.map(e => e.duration || 1))

  events.forEach(event => {
    const block = document.createElement('div')
    block.className = 'debug-timeline-block'
    block.style.width = `${(event.duration || 5) / maxDuration * 120}px`
    block.style.background = stringToColor(event.plugin)
    block.title = `${event.plugin}.${event.hook} (${event.duration?.toFixed(1)}ms)`
    container.appendChild(block)
  })
}

function stringToColor(str: string) {
  let hash = 0
  for (let i = 0; i < str.length; i++) {
    hash = str.charCodeAt(i) + ((hash << 5) - hash)
  }
  const hue = hash % 360
  return `hsl(${hue}, 70%, 60%)`
}
