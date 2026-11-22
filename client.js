/*
 * @local/dsh-workspace-expand — client half
 *
 * The left sidebar's navigation panel list (flex:none) consumes ~470px for 13
 * rows, squeezing the workspace list into a thin strip. Cap that list, let it
 * scroll, and guarantee the workspace region most of the sidebar height.
 *
 * Bundle plugins do not receive the dynamic-runner `styles` builtin, so insert
 * a package-owned <style> into <head> directly (the same thing styles.insert
 * does internally) and dispose it through ctx.effect.
 */
window.__ModuleLoader__.load({
  id: '@local/dsh-workspace-expand',
  factory(require) {
    const STYLE_ID = 'dsh-workspace-expand-styles';
    const CSS = [
      '/* dsh-workspace-expand: nav list scrolls instead of starving the workspace */',
      '[class*="panelList"]{',
      '  flex:0 1 auto !important;',
      '  max-height:min(34vh,300px) !important;',
      '  overflow-y:auto !important;',
      '  overflow-x:hidden !important;',
      '  scrollbar-width:thin;',
      '}',
      '[class*="panelList"] [class*="panelRow"]{',
      '  min-height:32px !important;',
      '  padding-top:5px !important;',
      '  padding-bottom:5px !important;',
      '}',
      '/* workspace region keeps the majority of the sidebar height */',
      '[class*="regionArea"]{',
      '  flex:1 1 auto !important;',
      '  min-height:46vh !important;',
      '}',
      '/* trim top chrome to hand more pixels to the list */',
      '[class*="logoRow"]{height:48px !important;}',
      '[class*="newSession"]{margin-bottom:6px !important;}',
    ].join('\n');

    return {
      apply(ctx) {
        if (typeof document === 'undefined') return;
        let style = document.getElementById(STYLE_ID);
        if (!style) {
          style = document.createElement('style');
          style.id = STYLE_ID;
          style.setAttribute('data-dsh-workspace-expand', '1');
          style.textContent = CSS;
          document.head.appendChild(style);
        }
        const dispose = () => {
          const el = document.getElementById(STYLE_ID);
          if (el) el.remove();
        };
        // ctx.effect calls the callback immediately and registers its RETURNED fn as the
        // disposer — so wrap `dispose`, never pass it directly (that would remove it now).
        if (ctx && typeof ctx.effect === 'function') ctx.effect(() => dispose, 'workspace-expand-styles');
        return dispose;
      },
    };
  },
});
