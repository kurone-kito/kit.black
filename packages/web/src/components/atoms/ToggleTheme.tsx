import { FaSolidMoon, FaSolidSun } from 'solid-icons/fa';
import { Component, mergeProps, Ref } from 'solid-js';

/** Type definition for the properties. */
export interface ToggleThemeProps {
  /** The reference to the input element. */
  readonly ref?: Ref<HTMLInputElement> | undefined;

  /** The themes list. */
  readonly themes?: readonly string[] | undefined;

  /** The tooltip to toggle the theme. */
  readonly toggleTooltip: string;
}

/**
 * The toggle to change the theme.
 * @param props The component properties.
 * @returns The component.
 */
export const ToggleTheme: Component<ToggleThemeProps> = (props) => {
  const concProps = mergeProps({ themes: [] } as const, props);
  return (
    <span
      class="tooltip tooltip-bottom btn btn-ghost pointer-events-none flex h-10 items-center"
      data-tip={concProps.toggleTooltip}
    >
      <label class="swap swap-rotate pointer-events-auto">
        <input
          aria-label={concProps.toggleTooltip}
          data-toggle-theme={concProps.themes.join(',')}
          onKeyDown={(e) => e.key === 'Enter' && e.currentTarget.click()}
          ref={concProps.ref}
          role="switch"
          type="checkbox"
          value="dark"
        />
        <FaSolidSun
          aria-hidden={true}
          class="fill-primary-content swap-off h-6 w-6"
        />
        <FaSolidMoon
          aria-hidden={true}
          class="fill-primary-content swap-on h-6 w-6"
        />
      </label>
    </span>
  );
};
