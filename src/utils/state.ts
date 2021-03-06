
/** Viewport type. */
export enum ViewportType {
  /** Mobile screen. */
  mobile = 'screen and (max-aspect-ratio: 4/5)',
  /** Tablet size screen. */
  tablet = 'screen and (max-aspect-ratio: 26/20)',
  /** Desktop size screen. */
  desktop = 'screen',
  /** Others. */
  others = 'all',
}

/** Viewport table. */
const viewportTable: ViewportType[] = [
  ViewportType.mobile,
  ViewportType.tablet,
  ViewportType.desktop,
  ViewportType.others,
];

/**
 * Detect current viewport type.
 *
 * In SSR mode, it returns ViewportType.mobile.
 */
export const viewport = () =>
  viewportTable.find(query => typeof window === 'undefined' || window.matchMedia(query).matches);
