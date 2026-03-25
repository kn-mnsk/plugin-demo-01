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
