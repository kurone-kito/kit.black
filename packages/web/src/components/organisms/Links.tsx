import { VRC } from '@kurone-kito/launchpad-icons-solid/dist/VRC';
import { clientOnly } from '@solidjs/start';
import {
  FaBrandsAmazon,
  FaBrandsGithub,
  FaBrandsKeybase,
  FaBrandsYoutube,
} from 'solid-icons/fa';
import { ImNpm } from 'solid-icons/im';
import type { Component } from 'solid-js';
import kito3 from '../../assets/avatars/kito3.webp';
import { useTranslator } from '../../modules/createI18N.js';
import { Marshmallow } from '../atoms/icons/Marshmallow.js';
import { X } from '../atoms/icons/X.js';
import { Article } from '../atoms/Article.js';
import { LinkItem } from '../molecules/LinkItem.js';

/** The random links component. */
const LinksRandom = clientOnly(() => import('./LinksRandom.js'));

/**
 * The links component.
 * @returns The component.
 */
export const Links: Component = () => {
  const t = useTranslator();
  return (
    <Article
      class="!px-safe bg-[image:var(--image-kito-url)] bg-cover bg-top bg-no-repeat py-0"
      heading={t('links')}
      style={{ '--image-kito-url': `url('${kito3}')` }}
    >
      <ul class="bg-base-100/80 grid grid-cols-3 justify-items-center gap-y-12 rounded-3xl bg-opacity-10 px-4 py-20 backdrop-blur-sm backdrop-filter md:grid-cols-4 md:gap-y-20 lg:gap-y-24 lg:backdrop-blur-md xl:gap-y-32 2xl:gap-y-40">
        <LinkItem
          caption="@kurone_kito"
          href="https://x.com/kurone_kito"
          hreflang="ja"
          title="𝕏/Twitter"
        >
          <X class="inline h-[4.5rem] w-[4.5rem]" />
        </LinkItem>
        <LinkItem
          caption="@kuronekito"
          href="https://youtube.com/@kuronekito"
          hreflang="ja"
          title="YouTube"
        >
          <FaBrandsYoutube class="inline" />
        </LinkItem>
        <LinkItem
          caption="ID: kurone-kito"
          href="https://vrchat.com/home/user/usr_4e529c16-8045-47fa-8deb-efeec9d73cba"
          hreflang="ja"
          title="VRChat"
        >
          <VRC class="inline h-[4.5rem] w-[4.5rem]" />
        </LinkItem>
        <LinkItem
          caption="@kurone_kito"
          href="https://marshmallow-qa.com/kurone_kito"
          hreflang="ja"
          title={t('marshmallow')}
        >
          <Marshmallow class="h-[4.5rem] w-[4.5rem]" />
        </LinkItem>
        <LinkItem
          caption="@kurone-kito"
          href="https://github.com/kurone-kito"
          hreflang="en"
          title="GitHub"
        >
          <FaBrandsGithub class="inline" />
        </LinkItem>
        <LinkItem
          caption="ID: kurone-kito"
          href="https://www.npmjs.com/~kurone-kito"
          hreflang="en"
          title="npm"
        >
          <ImNpm class="inline" />
        </LinkItem>
        <LinkItem
          caption={t('wishlist')}
          href="https://www.amazon.co.jp/hz/wishlist/ls/27C22EN4MOBL8"
          hreflang="ja"
          title="Amazon JP"
        >
          <FaBrandsAmazon class="inline" />
        </LinkItem>
        <LinkItem
          caption="ID: kurone_kito"
          href="https://keybase.io/kurone_kito"
          hreflang="en"
          title="Keybase"
        >
          <FaBrandsKeybase class="inline" />
        </LinkItem>
        <LinksRandom />
      </ul>
    </Article>
  );
};
