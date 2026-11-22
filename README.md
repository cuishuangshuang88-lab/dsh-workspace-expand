# dsh-workspace-expand

A DeepSeek Harness (DSH) client bundle plugin that gives the left sidebar's **workspace list** more room.

## Problem

In the DSH desktop sidebar, the top navigation panel (13 `panelRow` buttons, ~470 px tall, `flex:none`) squeezed the workspace list (`regionArea`) into a thin strip at the bottom.

## What it does

Injects a small stylesheet (via a `<style>` element in `document.head`) that:

- caps the navigation panel with `max-height:min(34vh,300px)` and `overflow-y:auto`, so the nav scrolls instead of eating the whole column;
- shrinks each nav row to `min-height:32px`;
- expands the workspace region with `flex:1 1 auto; min-height:46vh`;
- trims the logo row and the "new session" gap.

Selectors use `[class*=panelList]` / `[class*=regionArea]` etc., so they survive CSS-module hash changes across app builds.

## Install

From a DSH profile, install the bundle directory with the plugin manager:

```
plugin_manager install_bundle(target=/absolute/path/to/dsh-workspace-expand)
```

Then enable it (it is enabled on install by default). Reload/restart the app so the client half runs.

## Notes / gotchas for plugin authors

- Bundle plugins are loaded through `window.__ModuleLoader__.load({factory(require){...}})`; the module table has **no `styles` builtin** (`ctx.styles` / `require('styles')` are unavailable). Inject CSS with `document.createElement('style')` instead.
- `ctx.effect(fn, label)` calls `fn` **immediately** and registers its **return value** as the disposer. Register cleanup as `ctx.effect(() => dispose, label)`, never `ctx.effect(dispose, label)`.

## License

MIT
