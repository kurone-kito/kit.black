import type { Component } from 'solid-js';
import type { IconProps } from './types.js';

/**
 * The Pixiv icon.
 * @param props The component properties.
 * @returns The component.
 */
export const Pixiv: Component<IconProps> = (props) => (
  <svg
    role="img"
    viewBox="0 0 364.1 329"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <path
      class="[fill-rule:evenodd]"
      d="M319,39.4C290.4,14.4,250.3,0,203.8,0,82.5,0,0,93.6,0,93.6l23.2,36.9s12.9,1.1,6.1-20.7c5.9-11.1,17.4-26.1,39.9-43.3v245.9c-9.7,2.7-22.5,7.9-13.8,16.6h66.8c8.8-8.8-5.1-14.1-13.5-16.6v-58s45.8,18,95.1,18,82.8-12.9,112.2-36.2c29.4-23.2,48.3-57.8,48.1-97.4,0-38.8-16.5-74.5-45.2-99.4M199.7,249.4c-38,0-70-7.3-91.1-17.7V47.3c23.2-16.5,60.7-26.6,91.1-26.5,36.9,0,65.8,14,85.4,35.1,19.5,21.3,30.2,49.5,30.3,82.4-.1,32-11.5,58.3-31.8,78.6-20.3,20-49.8,32.7-83.9,32.7Z"
    />
  </svg>
);
