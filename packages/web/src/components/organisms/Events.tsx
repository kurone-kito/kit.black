import type { Component } from 'solid-js';
import eventMeow from '../../assets/events/meow-meetup.webp';
import eventUiUx from '../../assets/events/ui-ux-meetup.webp';
import {
  attributes as detailEnA,
  html as detailEn,
} from '../../assets/texts/events/detail.en.md';
import {
  attributes as detailJaA,
  html as detailJa,
} from '../../assets/texts/events/detail.ja.md';
import {
  attributes as meowEnA,
  html as meowEn,
} from '../../assets/texts/events/meow.en.md';
import {
  attributes as meowJaA,
  html as meowJa,
} from '../../assets/texts/events/meow.ja.md';
import {
  attributes as uiUxEnA,
  html as uiUxEn,
} from '../../assets/texts/events/ui-ux.en.md';
import {
  attributes as uiUxJaA,
  html as uiUxJa,
} from '../../assets/texts/events/ui-ux.ja.md';
import {
  createI18NDict,
  createI18NText,
  useLanguage,
} from '../../modules/createI18N.js';
import { Event } from '../atoms/cards/Event.js';
import { Article } from '../atoms/Article.js';

/** The detail translated attributes. */
const detailAttrTranslator = createI18NDict({ en: detailEnA, ja: detailJaA });

/** The detail translated markdown. */
const detailBodyTranslator = createI18NText({ en: detailEn, ja: detailJa });

/** The accessor for the meow meetup translated attributes. */
const meowAttrTranslator = createI18NDict({ en: meowEnA, ja: meowJaA });

/** The accessor for the meow meetup translated markdown. */
const meowBodyTranslator = createI18NText({ en: meowEn, ja: meowJa });

/** The accessor for the UI/UX meetup translated attributes. */
const uiUxAttrTranslator = createI18NDict({ en: uiUxEnA, ja: uiUxJaA });

/** The accessor for the UI/UX meetup translated markdown. */
const uiUxBodyTranslator = createI18NText({ en: uiUxEn, ja: uiUxJa });

/**
 * The events component.
 * @returns The component.
 */
export const Events: Component = () => {
  const language = useLanguage();
  const detailAttr = detailAttrTranslator(language);
  const detailBody = detailBodyTranslator(language);
  const meowAttr = meowAttrTranslator(language);
  const meowBody = meowBodyTranslator(language);
  const uiUxAttr = uiUxAttrTranslator(language);
  const uiUxBody = uiUxBodyTranslator(language);
  return (
    <Article heading={detailAttr('heading')}>
      <div
        class="prose [&_a]:link [&_a]:font-semibold"
        innerHTML={detailBody('text')}
      />
      <ul class="grid-col-1 grid gap-4 py-20 md:grid-cols-2 lg:grid-cols-1 2xl:grid-cols-2">
        <Event
          alt={meowAttr('alt')}
          class="prose [&_a]:link [&_li]:py-2 [&_ul]:list-inside [&_ul]:list-disc"
          heading={meowAttr('heading')}
          innerHTML={meowBody('text')}
          src={eventMeow}
        />
        <Event
          alt={uiUxAttr('alt')}
          class="prose [&_a]:link [&_li]:py-2 [&_ul]:list-inside [&_ul]:list-disc"
          heading={uiUxAttr('heading')}
          innerHTML={uiUxBody('text')}
          src={eventUiUx}
        />
      </ul>
    </Article>
  );
};
