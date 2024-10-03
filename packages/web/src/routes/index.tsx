import type { RouteSectionProps } from '@solidjs/router';
import type { Component } from 'solid-js';
import { Article } from '../components/atoms/Article.js';
import { Hero } from '../components/atoms/Hero.js';

/**
 * The top page.
 * @returns The component.
 */
const Index: Component<RouteSectionProps> = () => (
  <>
    <Hero
      logo={
        <div class="flex aspect-[29/40] h-auto w-full max-w-[100dvw] items-end sm:container md:max-w-md xl:max-w-lg">
          Kuroné Kito
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
    </Hero>
    <Article heading="Top page">TODO: Add the content here.</Article>
  </>
);

export default Index;
