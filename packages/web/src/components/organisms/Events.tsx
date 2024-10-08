import type { Component } from 'solid-js';
import eventMeow from '../../assets/events/meow-meetup.webp';
import eventUiUx from '../../assets/events/ui-ux-meetup.webp';
import { Event } from '../atoms/cards/Event.js';
import { Anchor } from '../atoms/Anchor.js';
import { Article } from '../atoms/Article.js';

/**
 * The events component.
 * @returns The component.
 */
export const Events: Component = () => (
  <Article heading="開催している VRChat イベント">
    <p>
      黒音キトが VRChat で開催しているイベントをご紹介します。
      <br />
      <Anchor class="link link-primary" href="http://vrc.group/KITO.5699">
        KITO.5699
      </Anchor>
      &nbsp;グループで Group+
      で開催しております。どなたでもご参加いただけますので、ぜひ遊びに来てください！
      <br />
      また、集会終了後は同一インスタンスで VR 睡眠もしています。😴
    </p>
    <ul class="grid-col-1 grid gap-4 py-20 md:grid-cols-2 lg:grid-cols-1 2xl:grid-cols-2">
      <Event alt="にゃんにゃん集会" heading="にゃんにゃん集会" src={eventMeow}>
        <li>
          猫なりきり、特に猫の声真似をテーマにした、ただ
          <strong>にゃんにゃん鳴くだけ</strong>の集会。
        </li>
        <li>
          猫ボイスが好きな方、自分を猫だと思っている方、もちろん黒音キトが大好きな方や、無言勢＆デスクトップ勢も大歓迎です。
        </li>
      </Event>
      <Event
        alt="UI/UX デザイン集会"
        heading="UI/UX デザイン集会"
        src={eventUiUx}
      >
        <li>
          Webで！ゲームで！日常生活や業務システムで！！
          <br />
          これまで見てきた<strong>クソ UI ・残念デザイン</strong>
          など、飲み会感覚でお気軽に語り合う集会です。エンジニアの方以外でも、デザインの敗北や
          Bad UI に思うところや興味があれば、お気軽にご参加ください！
        </li>
      </Event>
    </ul>
  </Article>
);
