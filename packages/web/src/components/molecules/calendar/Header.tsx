import { FaBrandsYoutube } from 'solid-icons/fa';
import type { Component, JSX } from 'solid-js';
import { Show } from 'solid-js';
import { X } from '../../atoms/icons/X.js';
import { Anchor } from '../../atoms/Anchor.js';
import { Logo } from '../../atoms/Logo.js';
import { HeaderItem } from './HeaderItem.js';

/** Type definition for the properties. */
export interface HeaderProps {
  /** The date span. */
  readonly dateSpan?: JSX.Element;
}

/**
 * The header component for the schedule.
 * @param props The properties.
 * @returns The component.
 */
export const Header: Component<HeaderProps> = (props) => (
  <header class="flex items-end gap-4 drop-shadow lg:basis-4/12 lg:flex-col-reverse">
    <div class="relative w-full basis-3/12 sm:basis-4/12">
      <Logo
        class="lg:text-stroke-3 max-md:opacity-80"
        level={3}
        role="banner"
      />
      <Logo aria-hidden class="absolute top-0 w-full max-md:hidden" level={3} />
    </div>
    <div class="text-stroke-3">
      <h4 class="text-[4.5cqi] font-semibold lg:text-[3.1cqi] xl:text-[3.2cqi] 2xl:text-[3.1cqi]">
        予定表:
        <Show when={props.dateSpan}>
          &nbsp;
          <wbr />
          <span class="whitespace-nowrap text-nowrap break-keep">
            {props.dateSpan}
          </span>
        </Show>
      </h4>
      <p class="font-semibold md:text-[2.8cqi] lg:text-[2.7cqi]">
        #️⃣&nbsp;
        <Anchor
          class="text-semibold link link-primary"
          href="https://x.com/hashtag/%E3%82%AD%E3%83%88%E3%81%AE%E8%A6%8B%E7%A9%8D%E3%82%82%E3%82%8A"
          translate="no"
        >
          #キトの見積もり
        </Anchor>
      </p>
      <ul class="flex gap-2 py-2 sm:gap-4 md:text-[2.8cqi] lg:block lg:text-[2.8cqi] lg:text-base lg:tracking-tighter xl:flex xl:text-[2.4cqi]">
        <HeaderItem
          accountId="kuronekito"
          href="https://youtube.com/@kuronekito"
        >
          <FaBrandsYoutube class="inline h-6 w-6" />
        </HeaderItem>
        <HeaderItem accountId="kurone_kito" href="https://x.com/kurone_kito">
          <X class="[&_*]:fill-primary inline h-6 w-6" />
        </HeaderItem>
      </ul>
    </div>
  </header>
);
