import type { IconProps } from 'solid-icons';
import type { Component } from 'solid-js';
import { splitProps } from 'solid-js';
import { twMerge } from 'tailwind-merge';

/**
 * The marshmallow icon component.
 * @param props The properties.
 * @returns The component.
 */
export const Marshmallow: Component<IconProps> = (props) => {
  const [local, rest] = splitProps(props, ['class']);
  return (
    <svg
      class={twMerge('isolate', local.class)}
      height="310.882pt"
      viewBox="265.504 142.199 310.882 310.882"
      width="310.882pt"
      xmlns="http://www.w3.org/2000/svg"
      {...rest}
    >
      <g>
        <path
          d=" M 426.211 155.584 C 409.786 142.298 395.693 138.837 376.452 145.497 C 357.793 151.956 336.407 165.936 312.824 189.519 C 289.24 213.103 275.261 234.488 268.802 253.147 C 262.142 272.388 265.603 286.481 278.889 302.907 C 301.152 330.429 324.502 353.138 348.671 372.688 C 365.096 385.974 379.189 389.435 398.43 382.775 C 417.089 376.317 438.474 362.336 462.058 338.753 C 485.642 315.169 499.621 293.784 506.08 275.125 C 512.74 255.884 509.279 241.791 495.993 225.366 C 476.442 201.197 453.734 177.847 426.211 155.584 Z "
          fill="rgb(77,77,77)"
        />
        <path
          d=" M 350.036 226.731 C 331.25 245.885 315.262 257.44 298.559 264.45 C 295.884 265.572 293.85 269.05 295.289 272.967 C 297.306 278.455 300.813 278.641 303.507 277.915 C 319.308 273.656 341.683 257.439 361.214 237.909 C 383.631 215.492 398.51 193.976 405.439 173.955 C 406.83 169.938 407.775 166.153 408.295 162.519 C 411.645 164.363 415.11 166.815 418.863 169.895 C 442.902 189.616 462.078 208.478 481.682 232.713 C 493.577 247.419 496.236 257.606 489.848 273.633 C 483.214 290.273 470.14 308.416 450.931 327.625 C 431.722 346.835 413.578 359.908 396.938 366.542 C 380.911 372.932 370.642 370.374 356.018 358.377 C 331.92 338.606 312.922 319.597 293.2 295.558 C 281.203 280.934 278.645 270.665 285.034 254.638 C 291.668 237.998 304.742 219.855 323.951 200.646 C 343.161 181.437 361.304 168.363 377.943 161.729 C 385.557 158.694 391.614 162.903 388.834 170.927 C 383.797 185.465 370.808 205.552 350.036 226.731 Z "
          fill="rgb(255,255,255)"
        />
        <path
          d=" M 414.078 404.376 C 410.87 407.585 411.56 409.709 413.728 411.877 L 453.089 451.237 C 455.257 453.405 457.381 454.097 460.59 450.888 C 463.799 447.679 463.107 445.555 460.939 443.386 L 421.58 404.026 C 419.412 401.858 417.287 401.167 414.078 404.376 Z "
          fill="rgb(77,77,77)"
          fill-rule="evenodd"
        />
        <path
          d=" M 527.681 290.773 C 524.472 293.982 525.163 296.106 527.331 298.274 L 566.691 337.634 C 568.859 339.803 570.984 340.493 574.192 337.284 C 577.401 334.075 576.71 331.951 574.542 329.783 L 535.182 290.423 C 533.014 288.255 530.89 287.565 527.681 290.773 Z "
          fill="rgb(77,77,77)"
          fill-rule="evenodd"
        />
        <path
          d=" M 475.013 351.708 C 471.805 354.916 472.495 357.041 474.663 359.209 L 514.024 398.568 C 516.192 400.736 518.316 401.428 521.525 398.219 C 524.734 395.01 524.042 392.886 521.874 390.718 L 482.515 351.357 C 480.346 349.189 478.222 348.499 475.013 351.708 Z "
          fill="rgb(77,77,77)"
          fill-rule="evenodd"
        />
        <path
          d=" M 344.685 284.562 C 339.926 289.32 339.926 297.036 344.685 301.793 C 349.444 306.552 357.159 306.552 361.917 301.793 C 366.675 297.036 366.675 289.32 361.917 284.562 C 357.159 279.803 349.444 279.803 344.685 284.562 Z "
          fill="rgb(77,77,77)"
          fill-rule="evenodd"
        />
        <path
          d=" M 360.628 328.056 C 355.232 333.452 355.232 342.2 360.628 347.595 C 366.024 352.992 374.772 352.992 380.167 347.595 C 385.563 342.2 385.563 333.452 380.167 328.056 C 374.772 322.66 366.024 322.66 360.628 328.056 Z "
          fill="rgb(248,177,147)"
          fill-rule="evenodd"
        />
        <path
          d=" M 451.361 256.862 C 456.757 262.258 465.505 262.258 470.9 256.862 C 476.296 251.466 476.296 242.718 470.9 237.323 C 465.505 231.927 456.757 231.927 451.361 237.323 C 445.965 242.718 445.965 251.466 451.361 256.862 Z "
          fill="rgb(248,177,147)"
          fill-rule="evenodd"
        />
        <path
          d=" M 425.098 238.612 C 429.857 233.854 429.857 226.138 425.098 221.38 C 420.339 216.621 412.624 216.621 407.866 221.38 C 403.108 226.138 403.108 233.854 407.867 238.612 C 412.624 243.37 420.339 243.37 425.098 238.612 Z "
          fill="rgb(77,77,77)"
          fill-rule="evenodd"
        />
        <path
          d=" M 433.523 309.846 C 443.709 299.659 445.722 283.946 433.693 273.114 C 431.696 271.315 429.169 271.498 427.264 273.66 C 423.476 277.962 420.966 282.273 413.459 289.781 C 405.951 297.289 401.639 299.799 397.337 303.587 C 395.175 305.491 394.993 308.019 396.791 310.015 C 407.624 322.044 423.337 320.032 433.523 309.846 Z "
          fill="rgb(77,77,77)"
          fill-rule="evenodd"
        />
        <path
          d=" M 428.914 305.235 C 425.392 308.757 419.671 311.655 416.074 311.059 C 415.597 310.98 415.256 310.612 415.235 310.129 C 415.057 306.006 417.347 300.815 420.92 297.242 C 424.494 293.668 429.685 291.378 433.807 291.556 C 434.291 291.577 434.659 291.918 434.738 292.396 C 435.333 295.993 432.436 301.713 428.914 305.235 Z "
          fill="rgb(229,110,98)"
          fill-rule="evenodd"
        />
      </g>
    </svg>
  );
};
