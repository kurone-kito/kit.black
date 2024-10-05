import type { RouteSectionProps } from '@solidjs/router';
import type { Component } from 'solid-js';
import { Anchor } from '../components/atoms/Anchor.js';
import { Article } from '../components/atoms/Article.js';
import { Hero } from '../components/atoms/Hero.js';
import { Logo } from '../components/atoms/Logo.js';
import { ProfileItem } from '../components/atoms/ProfileItem.js';
import type { Item } from '../components/molecules/Carousel.js';
import { Carousel } from '../components/molecules/Carousel.js';

/** The items. */
const items = Array.from<unknown, Item>(
  { length: 10 },
  (_, i) => ['https://placehold.jp/256x144.png', `${i}`] as const,
);

/**
 * The top page.
 * @returns The component.
 */
const Index: Component<RouteSectionProps> = () => (
  <>
    <Hero
      logo={
        <div class="flex aspect-[29/40] h-auto w-full max-w-[100dvw] items-end sm:container md:max-w-md xl:max-w-lg">
          <Logo class="-ml-[36%] h-[50%] w-auto opacity-95" role="banner" />
        </div>
      }
    >
      <blockquote class="font-serif text-lg italic opacity-80 xl:text-2xl">
        “お仕事ぱたぱたいっぱい大変にゃんにゃん！”
      </blockquote>
      <p>
        黒音キトは、(元？)ブラックIT系な、黒猫にゃんにゃんVTuber。
        <br />
        本業は Web フロントエンドエンジニア。
      </p>
      <ul class="list-inside list-disc">
        <ProfileItem heading="活動開始">
          <time datetime="2018-11-02">2018 年 11 月 2 日</time>
        </ProfileItem>
        <ProfileItem heading="お誕生日">
          <time datetime="10-09">10 月 9 日</time>
        </ProfileItem>
        <ProfileItem heading="特技">にゃんにゃん鳴きます🐱</ProfileItem>
        <li>
          <Anchor class="link-hover link" href="https://vgeekpro.com">
            ぶいぎーく！Vgeek production
          </Anchor>
          &nbsp;所属 VTuber
        </li>
        <li>
          <Anchor class="link-hover link" href="https://engineer-meetup.com">
            エンジニア集会
          </Anchor>
          スタッフ
        </li>
      </ul>
    </Hero>
    <Carousel class="m-safe" items={items} />
    <Article heading="Top page">TODO: Add the content here.</Article>
  </>
);

export default Index;
