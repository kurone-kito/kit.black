import type { Component } from 'solid-js';
import sceneCats from '../../assets/activities/cats.webp';
import sceneCatsSrcset from '../../assets/activities/cats.webp?w=320;480;700;1000;1280&as=srcset';
import sceneCresteaju from '../../assets/activities/cresteaju.webp';
import sceneCresteajuSrcset from '../../assets/activities/cresteaju.webp?w=320;480;700;1000;1280&as=srcset';
import sceneEngineerMeetup from '../../assets/activities/engineer-meetup.webp';
import sceneEngineerMeetupSrcset from '../../assets/activities/engineer-meetup.webp?w=320;480;700;1000;1280&as=srcset';
import sceneFinalFantasyX from '../../assets/activities/final-fantasy-x.webp';
import sceneFinalFantasyXSrcset from '../../assets/activities/final-fantasy-x.webp?w=320;480;700;1000;1280&as=srcset';
import sceneFreeTalk from '../../assets/activities/free-talk.webp';
import sceneFreeTalkSrcset from '../../assets/activities/free-talk.webp?w=320;480;700;1000;1280&as=srcset';
import sceneHappyNewYear2024 from '../../assets/activities/happy-new-year-2024.webp';
import sceneHappyNewYear2024Srcset from '../../assets/activities/happy-new-year-2024.webp?w=320;480;700;1000;1280&as=srcset';
import sceneMahjongSoul from '../../assets/activities/mahjong-soul.webp';
import sceneMahjongSoulSrcset from '../../assets/activities/mahjong-soul.webp?w=320;480;700;1000;1280&as=srcset';
import sceneMomoneko from '../../assets/activities/momoneko.webp';
import sceneMomonekoSrcset from '../../assets/activities/momoneko.webp?w=320;480;700;1000;1280&as=srcset';
import scenePickup from '../../assets/activities/pickup.webp';
import scenePickupSrcset from '../../assets/activities/pickup.webp?w=320;480;700;1000;1280&as=srcset';
import sceneProjectSummerFlare from '../../assets/activities/project-summer-flare.webp';
import sceneProjectSummerFlareSrcset from '../../assets/activities/project-summer-flare.webp?w=320;480;700;1000;1280&as=srcset';
import sceneSleeping from '../../assets/activities/sleeping.webp';
import sceneSleepingSrcset from '../../assets/activities/sleeping.webp?w=320;480;700;1000;1280&as=srcset';
import sceneSleepyMeetup from '../../assets/activities/sleepy-meetup.webp';
import sceneSleepyMeetupSrcset from '../../assets/activities/sleepy-meetup.webp?w=320;480;700;1000;1280&as=srcset';
import uiUxMeetup from '../../assets/activities/ui-ux-meetup.webp';
import uiUxMeetupSrcset from '../../assets/activities/ui-ux-meetup.webp?w=320;480;700;1000;1280&as=srcset';
import type { Item } from '../molecules/Carousel.js';
import { Carousel } from '../molecules/Carousel.js';
import { useTranslator } from '../../modules/createI18N.js';

/** The activities. */
const activities = [
  [sceneFreeTalk, '雑談コラボの風景', sceneFreeTalkSrcset],
  [
    sceneEngineerMeetup,
    'VRChat: エンジニア作業飲み集会',
    sceneEngineerMeetupSrcset,
  ],
  [sceneFinalFantasyX, 'FINAL FANTASY X 実況プレイ', sceneFinalFantasyXSrcset],
  [
    sceneHappyNewYear2024,
    'VRChat: 2024年のあけおめ雑談',
    sceneHappyNewYear2024Srcset,
  ],
  [
    sceneSleepyMeetup,
    'VRChat: よふかしさんのつながり集会',
    sceneSleepyMeetupSrcset,
  ],
  [sceneMahjongSoul, '雀魂実況プレイ、みんなで友人戦', sceneMahjongSoulSrcset],
  [sceneMomoneko, 'ももねこちゃん三面図', sceneMomonekoSrcset],
  [sceneCresteaju, 'Cresteaju 実況プレイ', sceneCresteajuSrcset],
  [scenePickup, 'VRChat: にゃんにゃん集会 1', scenePickupSrcset],
  [sceneSleeping, 'VRChat: にゃんにゃん集会 2', sceneSleepingSrcset],
  [sceneCats, 'VRChat: にゃんにゃん集会 3', sceneCatsSrcset],
  [
    sceneProjectSummerFlare,
    'VRChat: Project Summer Flare',
    sceneProjectSummerFlareSrcset,
  ],
  [uiUxMeetup, 'VRChat: UI/UXデザイン集会', uiUxMeetupSrcset],
] as const satisfies readonly Item[];

/**
 * The `sizes` attribute for every carousel slide image. Each slide is
 * rendered edge-to-edge (no `container` ancestor) at `h-full w-auto`,
 * so its on-screen width is driven entirely by the carousel `ul`'s own
 * aspect ratio (`aspect-[19/9] md:aspect-[27/9] xl:aspect-[28/9]
 * 2xl:aspect-[43/9]`) against the slide image's own 16:9 aspect ratio:
 * `slideWidth = viewportWidth * (9 / N) * (16 / 9)`, i.e.
 * `viewportWidth * (16 / N)` for each breakpoint's own `N`. The
 * fraction is therefore expressed in `vw`, not a fixed pixel value,
 * since (unlike the grid-based cards) this carousel has no container
 * cap and keeps scaling with the viewport within each band. Each
 * import's `w=` list adds the source assets' native 1280 width as its
 * top step so a wide viewport at a high device pixel ratio (where
 * `slotWidth * dpr` can exceed every smaller step) still resolves to a
 * sharp image, never softer than this carousel rendered before this
 * change.
 */
const ACTIVITIES_CAROUSEL_SIZES =
  '(min-width: 1536px) 37vw, (min-width: 1280px) 57vw, (min-width: 768px) 59vw, 84vw';

/**
 * The activities carousel.
 * @returns The component.
 */
export const ActivitiesCarousel: Component = () => {
  const t = useTranslator();
  return (
    <Carousel
      class="m-safe"
      items={activities}
      label={t('activitiesCarousel')}
      sizes={ACTIVITIES_CAROUSEL_SIZES}
    />
  );
};
