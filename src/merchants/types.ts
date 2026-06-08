/**
 * One waiver entry point (e.g. TrustedWaiver-style path segment).
 * Merchants add new rows here or in their own module + registry.
 */
export interface WaiverLocationConfig {
  /** Single public URL segment, e.g. `sahelieyebrow-aurora` (GitHub Pages entry + React path) */
  publicRouteSlug: string;
  /** URL path segment for waiver meta, e.g. `sahelieyebrow` */
  merchantSlug: string;
  /** Short id for payloads, e.g. `aurora` */
  waiverPageSlug: string;
  /** Human label, e.g. "Centennial Location" (TrustedWaiver page titles) */
  locationDisplayName: string;
  /** Used in email subject: "New Waiver Submission - [this] - Name" */
  emailSubjectLocation: string;
  addressLine: string;
  phone: string;
  /** <title> and browser tab */
  documentTitle: string;
  /** One line under the main H1 (plain text) */
  formIntroLine: string;
  /** Small line under brand in sticky header */
  headerTagline: string;
  /** Footer line above copyright */
  footerLocationLine: string;
}
