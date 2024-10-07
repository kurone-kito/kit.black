import type { Component } from 'solid-js';
import sceneApexLegends from '../../assets/activities/apex-legends.webp';
import sceneAmebient from '../../assets/activities/amebient.webp';
import sceneLaunchpadIcons from '../../assets/activities/launchpad-icons.webp';
import sceneUiUxLightningTalk from '../../assets/activities/ui-ux-lightning-talk.webp';
import { Activity } from '../atoms/cards/Activity.js';
import { Article } from '../atoms/Article.js';

/**
 * The activities component.
 * @returns The component.
 */
export const Activities: Component = () => (
  <Article
    class="lg:px-safe-or-2 xl:px-safe-or-8"
    heading="黒音キトの主な活動内容"
  >
    <ul class="grid grid-cols-1 gap-4 lg:grid-cols-2">
      <Activity
        alt="Launchpad Icons: VRChat 風アイコン集の制作作業"
        heading="ライブ プログラミング"
        src={sceneLaunchpadIcons}
      >
        Web 制作や VRChat
        のワールド・ギミック系アセット制作を中心に、ライブ配信でプログラミングを行っています。また制作物の殆どは
        OSS として公開しています。
      </Activity>
      <Activity
        alt="UI/UX デザイン集会における登壇風景"
        heading="VRChat 集会の開催"
        src={sceneUiUxLightningTalk}
      >
        定期的に VRChat で “UI/UX デザイン集会” および “にゃんにゃん集会”
        を開催しています。また、“エンジニア作業飲み集会”
        などの技術系集会には高頻度で参加しています。
      </Activity>
      <Activity
        alt="APEX Legends 実況プレイの風景"
        heading="ゲームの実況プレイ"
        src={sceneApexLegends}
      >
        APEX Legends
        や雀魂を中心に、様々なゲームの実況プレイをライブ配信しています。
      </Activity>
      <Activity
        alt="初音ミク(ほぼ)オリジナル曲“Amebient”"
        heading="その他活動"
        src={sceneAmebient}
      >
        低頻度ですがイラストや VOCALOID
        楽曲制作、歌ってみた動画など様々な活動も行っています。
      </Activity>
    </ul>
  </Article>
);
