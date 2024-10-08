import { Group } from '@kurone-kito/launchpad-icons-solid/dist/Group';
import { VRC } from '@kurone-kito/launchpad-icons-solid/dist/VRC';
import {
  FaBrandsAmazon,
  FaBrandsGithub,
  FaBrandsKeybase,
  FaBrandsSteam,
  FaBrandsYoutube,
} from 'solid-icons/fa';
import { ImNpm } from 'solid-icons/im';
import type { Component } from 'solid-js';
import kito3 from '../../assets/avatars/kito3.webp';
import { Article } from '../atoms/Article.js';
import { Threads } from '../atoms/icons/Threads.jsx';
import { L08 } from '../atoms/icons/L08.jsx';
import { Marshmallow } from '../atoms/icons/Marshmallow.jsx';
import { LinkItem } from '../molecules/LinkItem.js';

/**
 * The links component.
 * @returns The component.
 */
export const Links: Component = () => (
  <Article
    class="!px-safe bg-[image:var(--image-kito-url)] bg-cover bg-top bg-no-repeat py-0"
    heading="黒音キトの SNS リンク集"
    style={{ '--image-kito-url': `url("${kito3}")` }}
  >
    <ul class="bg-base-100/80 grid grid-cols-3 justify-items-center gap-y-12 rounded-3xl bg-opacity-10 px-4 py-20 backdrop-blur-sm backdrop-filter md:grid-cols-4 md:gap-y-20 lg:gap-y-24 lg:backdrop-blur-md xl:gap-y-32 2xl:gap-y-40">
      <LinkItem caption="@kurone_kito" href="https://x.com/kurone_kito">
        𝕏
      </LinkItem>
      <LinkItem caption="@kuronekito" href="https://youtube.com/@kuronekito">
        <FaBrandsYoutube class="inline" />
      </LinkItem>
      <LinkItem
        caption="ID: kurone-kito"
        href="https://vrchat.com/home/user/usr_4e529c16-8045-47fa-8deb-efeec9d73cba"
      >
        <VRC class="inline h-[4.5rem] w-[4.5rem]" />
      </LinkItem>
      <LinkItem caption="KITO.5699" href="https://vrc.group/KITO.5699">
        <Group class="[&_*]:!fill-accent-content [&_*]:!stroke-accent-content inline h-[4.5rem] w-[4.5rem]" />
      </LinkItem>
      <LinkItem caption="@kurone-kito" href="https://github.com/kurone-kito">
        <FaBrandsGithub class="inline" />
      </LinkItem>
      <LinkItem caption="kurone-kito" href="https://www.npmjs.com/~kurone-kito">
        <ImNpm class="inline" />
      </LinkItem>
      <LinkItem
        caption="ほしい物リスト"
        href="https://www.amazon.co.jp/hz/wishlist/ls/27C22EN4MOBL8"
      >
        <FaBrandsAmazon class="inline" />
      </LinkItem>
      <LinkItem
        caption="kurone_kito"
        href="https://steamcommunity.com/id/kurone_kito/"
      >
        <FaBrandsSteam class="inline" />
      </LinkItem>
      <LinkItem caption="kurone_kito" href="https://keybase.io/kurone_kito">
        <FaBrandsKeybase class="inline" />
      </LinkItem>
      <LinkItem
        caption="@kurone_kito"
        href="https://www.threads.net/@kurone_kito"
      >
        <Threads class="h-[4.5rem] w-[4.5rem]" />
      </LinkItem>
      <LinkItem caption="@kurone_kito" href="https://l08.me/p/kurone_kito">
        <L08 class="h-[4.5rem] w-[4.5rem]" />
      </LinkItem>
      <LinkItem
        caption="@kurone_kito"
        href="https://marshmallow-qa.com/kurone_kito"
      >
        <Marshmallow class="h-[4.5rem] w-[4.5rem]" />
      </LinkItem>
    </ul>
  </Article>
);
