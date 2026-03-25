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
