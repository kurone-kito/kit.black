import { tupleMap, weekRange, formatDate } from '@kurone-kito/kit.black-lib';
import type { RouteSectionProps } from '@solidjs/router';
import type { Component } from 'solid-js';
import { Anchor } from '../components/atoms/Anchor.js';
import { Article } from '../components/atoms/Article.js';
import { Hero } from '../components/atoms/Hero.js';
import { ProfileItem } from '../components/atoms/ProfileItem.js';
import type { RowProps } from '../components/atoms/calendar/Row.js';
import { KitoWithLogo } from '../components/molecules/KitoWithLogo.js';
import { Calendar } from '../components/molecules/calendar/Calendar.js';
import { Activities } from '../components/organisms/Activities.js';
import { ActivitiesCarousel } from '../components/organisms/ActivitiesCarousel.js';
import rows from '../data.json';
import { now } from '../modules/datetime.js';

const [since, until] = tupleMap(weekRange(now()), formatDate);

/**
 * The top page.
 * @returns The component.
 */
const Index: Component<RouteSectionProps> = () => (
  <>
    <Hero logo={<KitoWithLogo />}>
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
    <ActivitiesCarousel />
    <Activities />
    <Article
      class="!px-safe flex flex-col justify-center xl:w-10/12"
      heading="#VTuber予定表"
    >
      <Calendar
        id="calendar"
        rows={rows as readonly RowProps[]}
        since={since}
        until={until}
      />
    </Article>
  </>
);

export default Index;
