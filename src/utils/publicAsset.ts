/**
 * Asset base path. Uses Vite `base` from build; if that is `/` but the app is served
 * under a GitHub Pages project path (`*.github.io/repo-name/`), infer `/repo-name/`
 * so `public/` files and `gas-webapp.json` resolve correctly.
 */
export function effectiveAssetsBase(): string {
  let base = (import.meta.env.BASE_URL || '/').replace(/\/?$/, '/');
  if (base !== '/') return base;
  if (typeof window === 'undefined') return '/';
  const {hostname, pathname} = window.location;
  if (!hostname.endsWith('github.io')) return '/';
  const seg = pathname.split('/').filter(Boolean)[0];
  if (!seg) return '/';
  return `/${seg}/`;
}

/** Vite `public/` file URL, correct under GitHub Pages base (e.g. /saheli-waiver-form/). */
export function publicAssetUrl(filename: string): string {
  const base = effectiveAssetsBase();
  const name = filename.replace(/^\//, '');
  return `${base}${name}`;
}
