# A minimal starter project - Demo

A tiny repo structure with:

- DocsViewer
- registry
- frame queue
- two plugins
- demo HTML

## 1. Project Structure

```
docs-viewer-demo/
  ├── index.html
  ├── src/
  │   ├── docs-viewer.ts
  │   ├── frame-task-queue.ts
  │   ├── plugin-types.ts
  │   ├── plugin-registry.ts
  │   └── plugins/
  │       ├── callout/
  │       │   ├── index.ts
  │       │   ├── callout.plugin.ts
  │       │   └── callout.styles.css
  │       └── tabs/
  │           ├── index.ts
  │           ├── tabs.plugin.ts
  │           └── tabs.styles.css
  └── main.ts

```

## 2. Core Types: _plugin-types.ts_

```ts
export interface PluginContext {
  enqueueDOM: (fn: () => void) => void;
}

export interface DocsPlugin {
  namespace: string;
  onMount?: (el: HTMLElement, ctx: PluginContext) => void;
  onUnmount?: (el: HTMLElement) => void;
}

```

## 3. Frame Task Queue: _frame-task-queue.ts_

```ts
export class FrameTaskQueue {
  private queue: Array<() => void> = [];
  private scheduled = false;

  enqueue(task: () => void) {
    this.queue.push(task);
    if (!this.scheduled) {
      this.scheduled = true;
      requestAnimationFrame(() => this.flush());
    }
  }

  private flush() {
    for (const task of this.queue) task();
    this.queue = [];
    this.scheduled = false;
  }
}


```

## 4. Plugin Registry: _plugin-registry.ts_

```ts
import { CalloutPlugin } from './plugins/callout';
import { TabsPlugin } from './plugins/tabs';

export const PLUGINS = [
  CalloutPlugin,
  TabsPlugin
];

```

## 5. DocsViewer: _docs-viewer.ts_

```ts
import { FrameTaskQueue } from './frame-task-queue';
import { PLUGINS } from './plugin-registry';
import type { DocsPlugin, PluginContext } from './plugin-types';

export class DocsViewer {
  private root: HTMLElement;
  private frameQueue = new FrameTaskQueue();
  private mounted = new Map<HTMLElement, DocsPlugin>();

  constructor(root: HTMLElement) {
    this.root = root;
  }

  render(html: string) {
    this.unmountPlugins();
    this.root.innerHTML = html;
    this.mountPlugins();
  }

  private mountPlugins() {
    const ctx: PluginContext = {
      enqueueDOM: fn => this.frameQueue.enqueue(fn)
    };

    const nodes = this.root.querySelectorAll('[data-plugin]');

    nodes.forEach(el => {
      const ns = el.getAttribute('data-plugin');
      const plugin = PLUGINS.find(p => p.namespace === ns);

      if (plugin) {
        plugin.onMount?.(el as HTMLElement, ctx);
        this.mounted.set(el as HTMLElement, plugin);
      }
    });
  }

  private unmountPlugins() {
    this.mounted.forEach((plugin, el) => {
      plugin.onUnmount?.(el);
    });
    this.mounted.clear();
  }
}

```

## 6. Example Plugin 1: Callout

_plugins/callout/index.ts_
```ts
export * from './callout.plugin';

```

_plugins/callout/callout.plugin.ts_
```ts
import type { DocsPlugin } from '../../plugin-types';

export const CalloutPlugin: DocsPlugin = {
  namespace: 'callout',

  onMount(el, ctx) {
    const type = el.getAttribute('data-type') ?? 'info';

    ctx.enqueueDOM(() => {
      el.classList.add('callout', `callout-${type}`);
    });
  },

  onUnmount(el) {
    el.classList.remove('callout', 'callout-info', 'callout-warning', 'callout-danger');
  }
};

```

_plugins/callout/callout.styles.css_
```Css
.callout {
  padding: 1rem;
  border-radius: 6px;
  margin: 1rem 0;
  border-left: 4px solid;
}

.callout-info {
  background: #eef6ff;
  border-color: #3b82f6;
}

.callout-warning {
  background: #fff8e1;
  border-color: #f59e0b;
}

.callout-danger {
  background: #fee2e2;
  border-color: #ef4444;
}

```

## 7. Example Plugin 2: Tabs

_plugins/tabs/index.ts_
```ts
import type { DocsPlugin } from '../../plugin-types';

export const TabsPlugin: DocsPlugin = {
  namespace: 'tabs',

  onMount(el, ctx) {
    const buttons = el.querySelectorAll('[data-tab]');
    const panels = el.querySelectorAll('[data-panel]');

    ctx.enqueueDOM(() => {
      buttons.forEach(btn => {
        btn.addEventListener('click', () => {
          const target = btn.getAttribute('data-tab');

          panels.forEach(panel => {
            panel.toggleAttribute('hidden', panel.getAttribute('data-panel') !== target);
          });
        });
      });
    });
  },

  onUnmount(el) {
    const buttons = el.querySelectorAll('[data-tab]');
    buttons.forEach(btn => {
      const clone = btn.cloneNode(true);
      btn.replaceWith(clone);
    });
  }
};

```

_plugins/tabs/tabs.styles.css_
```css
.tabs {
  border: 1px solid #ddd;
  padding: 1rem;
}

.tabs button {
  margin-right: 0.5rem;
}

.tabs [data-panel] {
  margin-top: 1rem;
}

```

## 8. Demo Page: _home.html_

```html
<div class="viewer" #viewer></div>
```

## 9. Entry Point: _home.ts_

## What You Get From This Hands‑On Project

- You see plugins mount and unmount
- You see DOM batching in action
- You see how DocsViewer becomes a host
- You see how plugins stay isolated
- You see how namespacing works
- You see how easy it is to add new plugins

This is the exact “aha moment” you were looking for.
