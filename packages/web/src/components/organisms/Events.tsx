import type { Component } from 'solid-js';
import eventMeow from '../../assets/events/meow-meetup.webp';
import eventMeowSrcset from '../../assets/events/meow-meetup.webp?w=220;320;420;840;1280&as=srcset';
import eventUiUx from '../../assets/events/ui-ux-meetup.webp';
import eventUiUxSrcset from '../../assets/events/ui-ux-meetup.webp?w=220;320;420;840;1280&as=srcset';
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

/**
 * The `sizes` attribute for every {@link Event} card image, derived
 * from `organisms/Events.tsx`'s own grid (`md:grid-cols-2
 * lg:grid-cols-1 2xl:grid-cols-2`) together with `atoms/cards/Event.tsx`'s
 * figure. Below `lg`, the figure stacks full-width above the card body
 * (100% of the grid cell), so its slot follows the default `Article`
 * container's own step function: 100% below `sm`, then a fixed
 * 640px cap through the `sm`-`md` 1-column band, then the 2-column
 * `md`-`lg` band's own capped-container math (768 - 64px padding,
 * minus `gap-4`, / 2 = 344). At `lg` and up, `lg:card-side` switches
 * the card to a horizontal layout and the figure is capped by its own
 * `max-w-*` instead (`lg:max-w-52 xl:max-w-56 2xl:max-w-80`), which is
 * narrower than a column share at every one of those breakpoints.
 *
 * The `w=` list's two upper steps (840, then the source assets' native
 * 1280 width) exist purely for device-pixel-ratio headroom on the
 * full-slot bands above -- a narrow phone at a common DPR of 2-3 needs
 * 780-1290 device pixels for a 100vw/640px slot, and these flyers
 * carry readable text, so under-provisioning them here would be a
 * visible sharpness regression versus today's single full-size image.
 */
const EVENT_SIZES =
  '(min-width: 1536px) 320px, (min-width: 1280px) 224px, (min-width: 1024px) 208px, (min-width: 768px) 344px, (min-width: 640px) 640px, 100vw';

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
          sizes={EVENT_SIZES}
          src={eventMeow}
          srcset={eventMeowSrcset}
        />
        <Event
          alt={uiUxAttr('alt')}
          class="prose [&_a]:link [&_li]:py-2 [&_ul]:list-inside [&_ul]:list-disc"
          heading={uiUxAttr('heading')}
          innerHTML={uiUxBody('text')}
          sizes={EVENT_SIZES}
          src={eventUiUx}
          srcset={eventUiUxSrcset}
        />
      </ul>
    </Article>
  );
};
