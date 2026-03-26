# Debug Overlay: Plugin Activity Visualizer

_A modular, namespaced, lifecycle‑aware overlay for understanding plugin behavior in real time._

## 1. Purpose

### This overlay makes invisible plugin behavior visible. It shows:
---
- When each plugin is invoked
- Which lifecycle hook fired
- What payload was passed
- How long the plugin took
- Whether it mutated the document
- Any warnings or errors
- A timeline of activity across the entire render pipeline

### It’s designed to be:
---
- Plugin‑system‑agnostic
- Namespaced (debugOverlay.*)
- Zero‑runtime‑cost when disabled
- Visually layered (timeline + event log + plugin panel)
- Contributor‑friendly (clear, explicit, teachable)

## 2. Architecture Overview

### 1. Overlay Namespace

Everything lives under:
```
debugOverlay/
  bus.ts
  index.ts
  timeline.ts     ← renderTimeline()
  log.ts          ← renderLog()
  panel.ts        ← renderPanel()
  styles.css

```


This ensures no collisions with plugin namespaces.

This gives you:

- timeline.ts → timeline visualization
- log.ts → event log
- panel.ts → aggregated plugin stats

Each file exports a single renderer, keeping the mental model crisp.

### 2. Event Bus (Core Contract)

Every plugin system can emit events into this bus: _bus.ts_

### 3. Plugin‑System Integration (Minimal Hook)

Wherever your plugin system calls a plugin:
```ts
async function runPlugin(plugin, hook, payload) {
  const start = performance.now()

  try {
    const result = await plugin[hook](payload)

    debugBus.emit({
      plugin: plugin.name,
      hook,
      timestamp: start,
      duration: performance.now() - start,
      payload,
      result
    })

    return result
  } catch (error) {
    debugBus.emit({
      plugin: plugin.name,
      hook,
      timestamp: start,
      error
    })
    throw error
  }
}

```

### 4. Visual Overlay Components

The overlay has three layers, each toggleable:

1. Timeline Bar — horizontal timeline of plugin events
2. Event Log — scrolling list of events
3. Plugin Panel — per‑plugin stats, durations, errors

#### 1. Timeline (Top of Screen)

Shows plugin activity over time:
```
| MarkdownParser.parse | CodeBlock.render | Mermaid.render | TOC.generate |
|■■■■■■■■■■■■■■■■■■■■■■|■■■■■|■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■|

```
Each block is proportional to duration.

#### 2. Event Log (Right Side)

Example entry:
```
[12.3ms] CodeBlock.render
  payload: { lang: "ts" }
  result: <pre>...</pre>

```
Errors appear in red with stack traces collapsed.

#### 3. Plugin Panel (Left Side)

Shows aggregated stats:

Plugin	|Calls	|Avg |Duration	|Errors
--------|-------|----|----------|------
MarkdownParser	|12	|3.2ms	|0
CodeBlock	|4	|8.1ms	|1
Mermaid	|2	|14.5ms	|0

### 5. Overlay UI (Minimal DOM Implementation)

Here’s a lightweight version you can drop into any environment: _index.ts_

This is intentionally simple — the real version can be React/Svelte/etc.

### 6. Timeline : _timeline.ts_

A horizontal bar of blocks, each representing a plugin call.
Duration controls width. Color is per‑plugin.

This gives you a compact flame‑chart‑like bar.

Contains renderTimeline() and the helper stringToColor().

### 7. Log: _log.ts_

Contains renderLog().

Append a new entry to the scrolling log.

This keeps the log incremental, not re‑rendered.

### 8. Panel: _panel.ts_

Aggregated stats per plugin.
Contains renderPanel().

This gives contributors a quick health snapshot of the plugin system.

### 9. Styles (Minimal for these component): _styles.scc_

### Why this separation is ideal

- Each file has a single responsibility
- Easy for contributors to navigate
- You can swap out any renderer without touching the others
- Perfect for plugin‑extensible documentation systems
- Matches your architectural philosophy: modular, namespaced, visual

### Why This Works for Your Architecture

This overlay:

- Makes plugin behavior explicit and teachable
- Visualizes lifecycle hooks in real time
- Helps contributors understand timing, ordering, and side effects
- Fits your philosophy of debug overlays + visual timelines
- Is plugin‑system‑ready and namespaced
- Requires minimal integration (just emit events)
- Can be extended with:

>- flame charts
>- dependency graphs
>- plugin‑to‑plugin messaging
>- DOM mutation tracking
>- frame‑budget warnings
