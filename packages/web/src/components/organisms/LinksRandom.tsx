import { Group } from '@kurone-kito/launchpad-icons-solid/dist/Group';
import {
  FaBrandsFacebook,
  FaBrandsInstagram,
  FaBrandsSteam,
  FaBrandsTwitch,
} from 'solid-icons/fa';
import type { Component } from 'solid-js';
import { For } from 'solid-js';
import misskey from '../../assets/links/misskey.webp';
import { Bluesky } from '../atoms/icons/Bluesky.js';
import { L08 } from '../atoms/icons/L08.js';
import { Pixiv } from '../atoms/icons/Pixiv.js';
import { Threads } from '../atoms/icons/Threads.js';
import type { LinkItemProps } from '../molecules/LinkItem.js';
import { LinkItem } from '../molecules/LinkItem.js';

/** The number of links to pick up. */
const PICKUP = 4;

/**
 * The random links component.
 * @returns The component.
 */
export const LinksRandom: Component = () => {
  const candidate = [
    {
      caption: '@kurone-kito',
      children: <Bluesky class="h-[4.5rem] w-[4.5rem]" />,
      href: 'https://bsky.app/profile/kurone-kito.bsky.social',
      title: 'Bluesky',
    },
    {
      caption: '@krone.kito',
      children: <FaBrandsFacebook class="inline" />,
      href: 'https://www.facebook.com/krone.kito',
      title: 'Facebook',
    },
    {
      caption: '@kurone_kito',
      children: <FaBrandsInstagram class="inline" />,
      href: 'https://www.instagram.com/kurone_kito',
      title: 'Instagram',
    },
    {
      caption: 'ID: 43011580',
      children: <Pixiv class="h-[4.5rem] w-[4.5rem]" />,
      href: 'https://www.pixiv.net/users/43011580',
      title: 'Pixiv',
    },
    {
      caption: 'ID: kurone_kito',
      children: <FaBrandsSteam class="inline" />,
      href: 'https://steamcommunity.com/id/kurone_kito/',
      title: 'Steam',
    },
    {
      caption: '@kurone_kito',
      children: <Threads class="h-[4.5rem] w-[4.5rem]" />,
      href: 'https://www.threads.net/@kurone_kito',
      title: 'Threads',
    },
    {
      caption: '@kurone_kito',
      children: <L08 class="h-[4.5rem] w-[4.5rem]" />,
      href: 'https://l08.me/p/kurone_kito',
      title: 'Towa',
    },
    {
      caption: '@kurone_kito',
      children: <FaBrandsTwitch class="inline" />,
      href: 'https://www.twitch.tv/kurone_kito',
      title: 'Twitch',
    },
    {
      caption: 'KITO.5699',
      children: (
        <Group class="[&_*]:!fill-accent-content [&_*]:!stroke-accent-content inline h-[4.5rem] w-[4.5rem]" />
      ),
      href: 'https://vrc.group/KITO.5699',
      title: 'VRChat Group',
    },
    {
      caption: '@kurone_kito',
      children: (
        <img
          alt="にりらみすきー部"
          class="aspect-square h-[4.5rem] w-[4.5rem] object-contain"
          decoding="async"
          fetchpriority="low"
          height={872}
          loading="lazy"
          src={misskey}
          width={718}
        />
      ),
      href: 'https://misskey.niri.la/@kurone_kito',
      title: 'にりらみすきー部',
    },
  ] as const satisfies LinkItemProps[];
  const links = candidate
    .toSorted(() => Math.random() - 0.5)
    .slice(0, PICKUP)
    .toSorted((a, b) => a.title.localeCompare(b.title));
  return (
    <For each={links}>{(link) => <LinkItem hreflang="ja" {...link} />}</For>
  );
};

export default LinksRandom;
