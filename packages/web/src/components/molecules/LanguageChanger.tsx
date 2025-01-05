import { TbLanguageHiragana } from 'solid-icons/tb';
import type { Component } from 'solid-js';
import type { AnchorProps } from '../atoms/Anchor';
import { Anchor } from '../atoms/Anchor';

/** Type definition for the properties. */
export interface LanguageChangerProps extends Pick<AnchorProps, 'as'> {
  /** The English language URL. */
  readonly enHref: string;

  /** The Japanese language URL. */
  readonly jaHref: string;
}

/**
 * The language changer.
 * @param props The properties.
 * @returns The component.
 */
export const LanguageChanger: Component<LanguageChangerProps> = (props) => (
  <details class="dropdown" role="listbox">
    <summary class="btn btn-ghost">
      <TbLanguageHiragana
        aria-label="Language selection"
        class="stroke-primary-content h-6 w-6"
        role="img"
      />
    </summary>
    <ul class="menu dropdown-content bg-base-100 text-base-content !mt-0 w-40 gap-2">
      <li>
        <Anchor
          as={props.as}
          class="btn btn-ghost justify-start"
          href={props.enHref}
        >
          🇬🇧 ENGLISH
        </Anchor>
      </li>
      <li>
        <Anchor
          as={props.as}
          class="btn btn-ghost justify-start"
          href={props.jaHref}
        >
          🇯🇵 日本語
        </Anchor>
      </li>
    </ul>
  </details>
);
