import type { Component } from 'solid-js';

/** Type definition for the properties. */
export interface SplashProps {
  /** The animation flag. */
  readonly animation?: boolean;

  /** The accessible label describing the loading status. */
  readonly label: string;
}

/**
 * The splash component.
 *
 * `role="status"` is intentional, not decorative: the `splash-overlay`
 * class in `app.css` only ever shows this section for a genuine
 * ~3 s transient (or never at all, e.g. under
 * `prefers-reduced-motion: reduce`), so a screen reader user who does
 * encounter it is hearing an accurate, short-lived loading
 * announcement rather than a misused live region over static content.
 * @param props The properties.
 * @returns The component.
 */
export const Splash: Component<SplashProps> = (props) => (
  <section
    aria-label={props.label}
    class="splash-overlay absolute h-[100lvh] w-[100lvw]"
    role="status"
  >
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
