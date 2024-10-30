import type { Component } from 'solid-js';
import sceneApexLegends from '../../assets/activities/apex-legends.webp';
import sceneAmebient from '../../assets/activities/amebient.webp';
import sceneLaunchpadIcons from '../../assets/activities/launchpad-icons.webp';
import sceneUiUxLightningTalk from '../../assets/activities/ui-ux-lightning-talk.webp';
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
          src={sceneLaunchpadIcons}
        />
        <Activity
          alt={meetupAttr('alt')}
          class="prose [&_a]:link"
          heading={meetupAttr('heading')}
          innerHTML={meetupBody('text')}
          src={sceneUiUxLightningTalk}
        />
        <Activity
          alt={gamesAttr('alt')}
          class="prose [&_a]:link"
          heading={gamesAttr('heading')}
          innerHTML={gamesBody('text')}
          src={sceneApexLegends}
        />
        <Activity
          alt={othersAttr('alt')}
          class="prose [&_a]:link"
          heading={othersAttr('heading')}
          innerHTML={othersBody('text')}
          src={sceneAmebient}
        />
      </ul>
    </Article>
  );
};
