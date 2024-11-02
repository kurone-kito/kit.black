import type { Component } from 'solid-js';

/** Type definition for the properties. */
export interface SplashProps {
  /** The animation flag. */
  readonly animation?: boolean;
}

/**
 * The splash component.
 * @param props The properties.
 * @returns The component.
 */
export const Splash: Component<SplashProps> = (props) => (
  <section class="absolute h-[100lvh] w-[100lvw]">
    <div class="bg-base-300 relative z-50 flex h-[100lvh] items-center justify-center overflow-hidden">
      <div
        class="text-base-content font-Lato animate-[splash-logo-scale_1.5s_ease-in_1.5s] text-[length:--splash-logo-scale] font-black uppercase opacity-[--splash-logo-opacity] [animation-fill-mode:forwards]"
        classList={{
          '[animation-play-state:paused]': !props.animation,
          '[animation-play-state:running]': props.animation,
        }}
      >
        <span class="drop-shadow-lg">o</span>
        <div
          class="absolute left-0 top-0 h-screen w-full animate-[splash-logo-conic_2s] bg-[conic-gradient(transparent_var(--splash-logo-conic),theme('colors.base-content')_var(--splash-logo-conic)_100%)] [animation-fill-mode:forwards]"
          classList={{
            '[animation-play-state:paused]': !props.animation,
            '[animation-play-state:running]': props.animation,
          }}
        />
      </div>
    </div>
  </section>
);
