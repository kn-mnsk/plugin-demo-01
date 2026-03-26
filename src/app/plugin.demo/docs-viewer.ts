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

    console.log(`Log: DocsViewer mountPlugins: PLUGINS`, PLUGINS);

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
