/** The image MIME type produced when the browser can encode WebP. */
const WEBP_TYPE = 'image/webp';

/**
 * Decides the file extension from the produced blob's MIME type.
 *
 * Safari cannot encode WebP, so a WebP request there still yields a
 * `image/png` blob; deciding from `blob.type` (rather than the
 * requested format) keeps the downloaded filename honest either way.
 * @param blobType The MIME type reported by the captured blob.
 * @returns `'webp'` for a WebP blob, `'png'` for everything else.
 */
export const extensionFromBlobType = (blobType: string): 'png' | 'webp' =>
  blobType === WEBP_TYPE ? 'webp' : 'png';

/**
 * Builds the download filename for the captured schedule calendar.
 * @param since The displayed range's start date, as shown in the UI.
 * @param until The displayed range's end date, as shown in the UI.
 * @param blobType The MIME type reported by the captured blob.
 * @returns The filename, e.g. `schedule-08-10-08-16.webp`.
 */
export const calendarDownloadFilename = (
  since: string,
  until: string,
  blobType: string,
): string => {
  const slug = (value: string): string => value.replaceAll('/', '-');
  const extension = extensionFromBlobType(blobType);
  return `schedule-${slug(since)}-${slug(until)}.${extension}`;
};
