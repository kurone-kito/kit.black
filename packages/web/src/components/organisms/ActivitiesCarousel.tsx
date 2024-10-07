import type { Component } from 'solid-js';
import sceneCats from '../../assets/activities/cats.webp';
import sceneCresteaju from '../../assets/activities/cresteaju.webp';
import sceneEngineerMeetup from '../../assets/activities/engineer-meetup.webp';
import sceneFinalFantasyX from '../../assets/activities/final-fantasy-x.webp';
import sceneFreeTalk from '../../assets/activities/free-talk.webp';
import sceneHappyNewYear2024 from '../../assets/activities/happy-new-year-2024.webp';
import sceneMahjongSoul from '../../assets/activities/mahjong-soul.webp';
import sceneMomoneko from '../../assets/activities/momoneko.webp';
import scenePickup from '../../assets/activities/pickup.webp';
import sceneProjectSummerFlare from '../../assets/activities/project-summer-flare.webp';
import sceneSleeping from '../../assets/activities/sleeping.webp';
import sceneSleepyMeetup from '../../assets/activities/sleepy-meetup.webp';
import uiUxMeetup from '../../assets/activities/ui-ux-meetup.webp';
import type { Item } from '../molecules/Carousel.js';
import { Carousel } from '../molecules/Carousel.js';

/** The activities. */
const activities = [
  [sceneFreeTalk, '雑談コラボの風景'],
  [sceneEngineerMeetup, 'VRChat: エンジニア作業飲み集会'],
  [sceneFinalFantasyX, 'FINAL FANTASY X 実況プレイ'],
  [sceneHappyNewYear2024, 'VRChat: 2024年のあけおめ雑談'],
  [sceneSleepyMeetup, 'VRChat: よふかしさんのつながり集会'],
  [sceneMahjongSoul, '雀魂実況プレイ、みんなで友人戦'],
  [sceneMomoneko, 'ももねこちゃん三面図'],
  [sceneCresteaju, 'Cresteaju 実況プレイ'],
  [scenePickup, 'VRChat: にゃんにゃん集会 1'],
  [sceneSleeping, 'VRChat: にゃんにゃん集会 2'],
  [sceneCats, 'VRChat: にゃんにゃん集会 3'],
  [sceneProjectSummerFlare, 'VRChat: Project Summer Flare'],
  [uiUxMeetup, 'VRChat: UI/UXデザイン集会'],
] as const satisfies readonly Item[];

/**
 * The activities carousel.
 * @returns The component.
 */
export const ActivitiesCarousel: Component = () => (
  <Carousel class="m-safe" items={activities} />
);
