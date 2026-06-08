import type {WaiverLocationConfig} from './types';
import {SAHELI_EYEBROW_LOCATIONS} from './sahelieyebrow/locations';

/** All registered waiver routes (add imports from other merchants here). */
const ALL_LOCATIONS: WaiverLocationConfig[] = [...SAHELI_EYEBROW_LOCATIONS];

/** Old two-segment TrustedWaiver-style paths → still resolve after URL shorten. */
const LEGACY_WAIVER_SLUG_TO_ROUTE: Record<string, string> = {
  'waiver-from-centennial-location': 'sahelieyebrow-centennial',
  'waiver-from-aurora-location': 'sahelieyebrow-aurora',
  'waiver-from-thornton-location': 'sahelieyebrow-thornton',
  'waiver-from-denver-location': 'sahelieyebrow-denver',
  'waiver-from-parker-location': 'sahelieyebrow-parker',
};

export function resolveWaiverSiteSlug(siteSlug: string | undefined): WaiverLocationConfig | null {
  if (!siteSlug) return null;
  const s = siteSlug.toLowerCase();
  return ALL_LOCATIONS.find((loc) => loc.publicRouteSlug.toLowerCase() === s) ?? null;
}

export function resolveWaiverLocation(
  merchantSlug: string | undefined,
  waiverPageSlug: string | undefined
): WaiverLocationConfig | null {
  if (!merchantSlug || !waiverPageSlug) return null;
  const m = merchantSlug.toLowerCase();
  const w = waiverPageSlug.toLowerCase();
  const direct =
    ALL_LOCATIONS.find(
      (loc) => loc.merchantSlug.toLowerCase() === m && loc.waiverPageSlug.toLowerCase() === w
    ) ?? null;
  if (direct) return direct;
  if (m === 'sahelieyebrow') {
    const route = LEGACY_WAIVER_SLUG_TO_ROUTE[w];
    if (route) {
      return ALL_LOCATIONS.find((loc) => loc.publicRouteSlug === route) ?? null;
    }
  }
  return null;
}

export function listAllWaiverHrefPaths(): string[] {
  return ALL_LOCATIONS.map((l) => l.publicRouteSlug);
}
