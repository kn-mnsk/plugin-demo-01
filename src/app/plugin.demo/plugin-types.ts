export interface PluginContext {
  enqueueDOM: (fn: () => void) => void;
}

export interface DocsPlugin {
  namespace: string;
  onMount?: (el: HTMLElement, ctx: PluginContext) => void;
  onUnmount?: (el: HTMLElement) => void;
}
