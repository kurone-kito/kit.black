import { iconNames } from '@kurone-kito/launchpad-icons-solid/dist/iconNames.mjs';
import type { Component } from 'solid-js';
import worksVrcUi from '../../assets/works/black.kit.vrcui.webp';
import worksDantalion from '../../assets/works/dantalion.webp';
import worksGraphig from '../../assets/works/graphig.webp';
import worksLaunchpadIcons from '../../assets/works/launchpad-icons.webp';
import { Anchor } from '../atoms/Anchor.js';
import { Article } from '../atoms/Article.js';
import { Ruby } from '../atoms/Ruby.js';
import { WorkCard } from '../molecules/WorkCard.js';

/**
 * The works component.
 * @returns The component.
 */
export const Works: Component = () => (
  <Article heading="黒音キトの主な作品">
    <p>
      黒音キトが主にライブ
      プログラミングで開発した作品群のうち、主要なものを幾つか紹介いたします。
    </p>
    <ul class="flex flex-col gap-4 py-20">
      <WorkCard
        alt="“Dantalion”Web ページ"
        heading="性格診断 Web アプリ “Dantalion”"
        href="https://kurone-kito.github.io/dantalion/"
        since={2021}
        src={worksDantalion}
      >
        <p>
          “<Ruby ruby="ダンタリオン">Dantalion</Ruby>”は、
          <Anchor
            class="link"
            href="https://ja.wikipedia.org/wiki/%E3%82%BD%E3%83%AD%E3%83%A2%E3%83%B3%E3%81%AE%E9%8D%B5"
          >
            ソロモンの鍵
          </Anchor>
          に登場する、悪魔学における序列 71
          番目の悪魔です。彼はあらゆる学術知識を教えてくれる反面、人の心を読み取り、意のままに操る能力を持っています。
        </p>
        <p>
          相手の性格を予測できれば、彼のように相手の意思を操ることも可能かもしれません。これは指定した生年月日からその人の性格を見破る
          Web アプリです。所謂 “動物占い” の亜流です。
        </p>
        <p>
          また、性格診断のコアライブラリは npm
          パッケージとして公開しており、あなたのアプリに性格診断機能を簡単に組み込むことができます。
        </p>
      </WorkCard>
      <WorkCard
        alt="“black.kit.vrcui”配布ページ"
        heading="VRChat 風 UI スキン “black.kit.vrcui”"
        href="https://kurone-kito.booth.pm/items/5545750"
        since={2024}
        src={worksVrcUi}
      >
        <p>VRChat 風の uGUI スキンです。</p>
        <p>
          将来的にこの UI スキンで LaunchPad
          のモックを作り、チュートリアル系ワールドに置いていただき、Visitor
          さんに手取り足取り教えられる環境を作りたい、という野望で鋭意アップデート中です。
        </p>
        <p>
          VRChat ワールドでの動作を想定していますが、中身は単なる unitypackage
          ですので、改造次第で Unity
          プロジェクト全般でご活用いただけると思います。
        </p>
      </WorkCard>
      <WorkCard
        alt="“Launchpad Icons”Web ページ"
        heading="VRChat 風アイコン集 “Launchpad Icons”"
        href="https://kurone-kito.github.io/launchpad-icons/ja/"
        since={2024}
        src={worksLaunchpadIcons}
      >
        <p>
          Adobe Illustrator で再デザインし、SVG フォーマットで出力した VRChat
          風のアイコン集です。VRChat で使いやすいよう VPM
          パッケージで配布しているほか、Web でも利用いただけるよう Solid.js
          および React 対応バージョンを、
          <Anchor
            class="link"
            href="https://www.npmjs.com/search?q=%40kurone-kito%2Flaunchpad-icon"
          >
            npm パッケージとして用意
          </Anchor>
          しております。
        </p>
        <p>
          現在 {iconNames.length}&nbsp;
          種類のアイコンを実装済みで、今後さらに増やしていく予定です。
        </p>
        <p>
          元々これは VRChat 風 UI スキン“
          <Anchor
            class="link"
            href="https://kurone-kito.booth.pm/items/5545750"
          >
            black.kit.vrcui
          </Anchor>
          ”の一部でしたが、多数の要望があり独立したパッケージとなりました。
        </p>
      </WorkCard>
      <WorkCard
        alt="黒音キト グラフィグ"
        heading="黒音キト グラフィグ"
        href="https://gist.github.com/kurone-kito/e3018a3920aa723d7c52632a70aba176"
        since={2019}
        src={worksGraphig}
      >
        <p>
          私の活動一周年を記念して、黒音キトのグラフィグを公開しました。
          各自でダウンロードしていただき、ペーパークラフト形式で組み立てしていただけます。
        </p>
        <p>
          折り線の有り・無し版がありますので、お好みの方をお選びください。A4
          サイズで印刷すると、概ね 60mm x 80mm x 60mm 程度になります。
        </p>
        <p>
          ぜひ皆様のアレンジなどをシェアしてください！推奨ハッシュタグ:&nbsp;
          <strong>#キトアート</strong>
        </p>
      </WorkCard>
    </ul>
    <p>
      <Anchor
        class="link link-primary font-semibold"
        href="https://github.com/kurone-kito"
      >
        黒音キトの GitHub リポジトリ
      </Anchor>
      では Windows や macOS
      のセットアップ全自動化バッチなど、上記の他にも多数の作品を公開してあります。ご興味がございましたらぜひご覧ください。
    </p>
  </Article>
);
