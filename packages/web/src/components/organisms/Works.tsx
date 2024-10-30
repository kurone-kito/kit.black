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
export const Works: Component = () => {
  const dantalion = (
    <>
      性格診断 Web アプリ “<Ruby ruby="ダンタリオン">Dantalion</Ruby>”
    </>
  );

  return (
    <Article heading="黒音キトの主な作品">
      <ul class="flex flex-col gap-4">
        <WorkCard
          alt="“Dantalion”Web ページ"
          heading={dantalion}
          href="https://kurone-kito.github.io/dantalion/"
          labelMore="もっと見る"
          labelSince="年リリース"
          since={2021}
          src={worksDantalion}
        >
          <p>
            “<Ruby ruby="ダンタリオン">Dantalion</Ruby>”は、
            <Anchor
              class="link"
              href="https://ja.wikipedia.org/wiki/ソロモンの鍵"
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
            公開しており、あなたのアプリに簡単に性格診断を組み込むことができます。
          </p>
        </WorkCard>
        <WorkCard
          alt="“black.kit.vrcui”配布ページ"
          heading="VRChat 風 UI スキン “black.kit.vrcui”"
          href="https://kurone-kito.booth.pm/items/5545750"
          labelMore="もっと見る"
          labelSince="年リリース"
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
          labelMore="もっと見る"
          labelSince="年リリース"
          since={2024}
          src={worksLaunchpadIcons}
        >
          <p>
            Adobe Illustrator で再デザインし、SVG フォーマットで出力した VRChat
            風のアイコン集です。VRChat で使いやすいよう VPM
            パッケージで配布しているほか、Web でも利用いただけるよう Solid.js
            および React 対応バージョンを npm パッケージとして用意しております。
          </p>
          <p>
            元々これは
            <Anchor
              class="link"
              href="https://kurone-kito.booth.pm/items/5545750"
            >
              black.kit.vrcui
            </Anchor>
            の一部でしたが、多数の要望があり独立したパッケージとなりました。
          </p>
        </WorkCard>
        <WorkCard
          alt="黒音キト グラフィグ"
          heading="黒音キト グラフィグ"
          href="https://gist.github.com/kurone-kito/e3018a3920aa723d7c52632a70aba176"
          labelMore="もっと見る"
          labelSince="年リリース"
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
    </Article>
  );
};
