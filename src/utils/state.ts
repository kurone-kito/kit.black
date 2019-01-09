import { Bulma } from 'bloomer/lib/bulma';

/** Viewport table. */
interface IViewportTable {
  /** Threshold of maximum. */
  max: number;
  /** Threshold of minimum. */
  min: number;
  /** type. */
  type: Bulma.Platform;
}

/** Viewport table. */
const viewportTable: IViewportTable[] = [
  { max: 769, min: Number.NEGATIVE_INFINITY, type: 'mobile' },
  { max: 1024, min: 769, type: 'tablet' },
  { max: 1216, min: 1024, type: 'desktop' },
  { max: Number.POSITIVE_INFINITY, min: 1216, type: 'widescreen' },
];

/** Detect current viewport type. */
export const viewport = () => {
  const { clientWidth } = document.documentElement;

  return viewportTable.find(({ max, min }) => clientWidth >= min && clientWidth < max).type;
};
