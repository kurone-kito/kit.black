import type { Component } from 'solid-js';
import sceneApexLegends from '../../assets/activities/apex-legends.webp';
import sceneApexLegendsSrcset from '../../assets/activities/apex-legends.webp?w=400;500;600;730;1280&as=srcset';
import sceneAmebient from '../../assets/activities/amebient.webp';
import sceneAmebientSrcset from '../../assets/activities/amebient.webp?w=400;500;600;730;1280&as=srcset';
import sceneLaunchpadIcons from '../../assets/activities/launchpad-icons.webp';
import sceneLaunchpadIconsSrcset from '../../assets/activities/launchpad-icons.webp?w=400;500;600;730;1280&as=srcset';
import sceneUiUxLightningTalk from '../../assets/activities/ui-ux-lightning-talk.webp';
import sceneUiUxLightningTalkSrcset from '../../assets/activities/ui-ux-lightning-talk.webp?w=400;500;600;730;1280&as=srcset';
import {
  attributes as devEnA,
  html as devEn,
} from '../../assets/texts/activities/dev.en.md';
import {
  attributes as devJaA,
  html as devJa,
} from '../../assets/texts/activities/dev.ja.md';
import {
  attributes as gamesEnA,
  html as gamesEn,
} from '../../assets/texts/activities/games.en.md';
import {
  attributes as gamesJaA,
  html as gamesJa,
} from '../../assets/texts/activities/games.ja.md';
import {
  attributes as meetupEnA,
  html as meetupEn,
} from '../../assets/texts/activities/meetup.en.md';
import {
  attributes as meetupJaA,
  html as meetupJa,
} from '../../assets/texts/activities/meetup.ja.md';
import {
  attributes as othersEnA,
  html as othersEn,
} from '../../assets/texts/activities/others.en.md';
import {
  attributes as othersJaA,
  html as othersJa,
} from '../../assets/texts/activities/others.ja.md';
import {
  createI18NDict,
  createI18NText,
  useLanguage,
  useTranslator,
} from '../../modules/createI18N.js';
import { Activity } from '../atoms/cards/Activity.js';
import { Article } from '../atoms/Article.js';

/**
 * The `sizes` attribute for every {@link Activity} card image, derived
 * from `organisms/Activities.tsx`'s own grid (`grid-cols-1
 * lg:grid-cols-2`) inside the `Article` container it renders with
 * (Tailwind's default `container` is a step function, not a
 * viewport-proportional value: 100% below `sm`, then a fixed
 * 640px/768px/1024px/1280px/1536px cap per breakpoint): a full slot
 * below `sm`, the container's own fixed cap for the two 1-column
 * bands (`sm`-`md`, `md`-`lg`), then roughly half of the container's
 * capped width (minus the grid's `gap-4` and this page's safe-area
 * padding) once `lg:grid-cols-2` splits it into 2 columns at `lg`,
 * `xl`, and `2xl`.
 *
 * The `w=` list's own top step (1280, the source assets' native
 * width) exists only for device-pixel-ratio headroom, not for this
 * `sizes` value: a narrow phone viewport (this list's smallest real
 * slot) at a common DPR of 2-3 needs 780-1290 device pixels, well
 * above the largest CSS slot this component ever renders (728px) --
 * capping at native keeps a high-DPR/mobile visitor at least as sharp
 * as before this change, at the cost of not shrinking that one
 * combination.
 */
const ACTIVITY_SIZES =
  '(min-width: 1536px) 728px, (min-width: 1280px) 600px, (min-width: 1024px) 496px, (min-width: 768px) 704px, (min-width: 640px) 640px, 100vw';

/** The translated attributes for the development activity. */
const devAttrTranslator = createI18NDict({ en: devEnA, ja: devJaA });

/** The translated markdown for the development activity. */
const devBodyTranslator = createI18NText({ en: devEn, ja: devJa });

/** The translated attributes for the games activity. */
const gamesAttrTranslator = createI18NDict({ en: gamesEnA, ja: gamesJaA });

/** The translated markdown for the games activity. */
const gamesBodyTranslator = createI18NText({ en: gamesEn, ja: gamesJa });

/** The translated attributes for the meetup activity. */
const meetupAttrTranslator = createI18NDict({ en: meetupEnA, ja: meetupJaA });

/** The translated markdown for the meetup activity. */
const meetupBodyTranslator = createI18NText({ en: meetupEn, ja: meetupJa });

/** The translated attributes for the others activity. */
const othersAttrTranslator = createI18NDict({ en: othersEnA, ja: othersJaA });

/** The translated markdown for the others activity. */
const othersBodyTranslator = createI18NText({ en: othersEn, ja: othersJa });

/**
 * The activities component.
 * @returns The component.
 */
export const Activities: Component = () => {
  const language = useLanguage();
  const devAttr = devAttrTranslator(language);
  const devBody = devBodyTranslator(language);
  const gamesAttr = gamesAttrTranslator(language);
  const gamesBody = gamesBodyTranslator(language);
  const meetupAttr = meetupAttrTranslator(language);
  const meetupBody = meetupBodyTranslator(language);
  const othersAttr = othersAttrTranslator(language);
  const othersBody = othersBodyTranslator(language);
  const t = useTranslator();
  return (
    <Article class="lg:px-safe-or-2 xl:px-safe-or-8" heading={t('activities')}>
      <ul class="grid grid-cols-1 gap-4 lg:grid-cols-2">
        <Activity
          alt={devAttr('alt')}
          class="prose [&_a]:link"
          heading={devAttr('heading')}
          innerHTML={devBody('text')}
          sizes={ACTIVITY_SIZES}
          src={sceneLaunchpadIcons}
          srcset={sceneLaunchpadIconsSrcset}
        />
        <Activity
          alt={meetupAttr('alt')}
          class="prose [&_a]:link"
          heading={meetupAttr('heading')}
          innerHTML={meetupBody('text')}
          sizes={ACTIVITY_SIZES}
          src={sceneUiUxLightningTalk}
          srcset={sceneUiUxLightningTalkSrcset}
        />
        <Activity
          alt={gamesAttr('alt')}
          class="prose [&_a]:link"
          heading={gamesAttr('heading')}
          innerHTML={gamesBody('text')}
          sizes={ACTIVITY_SIZES}
          src={sceneApexLegends}
          srcset={sceneApexLegendsSrcset}
        />
        <Activity
          alt={othersAttr('alt')}
          class="prose [&_a]:link"
          heading={othersAttr('heading')}
          innerHTML={othersBody('text')}
          sizes={ACTIVITY_SIZES}
          src={sceneAmebient}
          srcset={sceneAmebientSrcset}
        />
      </ul>
    </Article>
  );
};
