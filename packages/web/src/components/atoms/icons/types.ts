import type { JSX } from 'solid-js';
import type { Except } from 'type-fest';

/** Type definition for the properties. */
export interface IconProps
  extends Except<
    JSX.SvgSVGAttributes<SVGSVGElement>,
    | 'children'
    | 'height'
    | 'version'
    | 'viewBox'
    | 'width'
    | 'xmlns'
    | 'xmlns:xlink'
  > {}
