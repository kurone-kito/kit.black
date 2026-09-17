import type { Component } from 'solid-js';
import {
  attributes as dantalionEnA,
  html as dantalionEn,
} from '../../assets/texts/works/dantalion.en.md';
import {
  attributes as dantalionJaA,
  html as dantalionJa,
} from '../../assets/texts/works/dantalion.ja.md';
import {
  attributes as graphigEnA,
  html as graphigEn,
} from '../../assets/texts/works/graphig.en.md';
import {
  attributes as graphigJaA,
  html as graphigJa,
} from '../../assets/texts/works/graphig.ja.md';
import {
  attributes as liEnA,
  html as liEn,
} from '../../assets/texts/works/launchpad-icons.en.md';
import {
  attributes as liJaA,
  html as liJa,
} from '../../assets/texts/works/launchpad-icons.ja.md';
import {
  attributes as vrcuiEnA,
  html as vrcuiEn,
} from '../../assets/texts/works/vrcui.en.md';
import {
  attributes as vrcuiJaA,
  html as vrcuiJa,
} from '../../assets/texts/works/vrcui.ja.md';
import { html as asideEn } from '../../assets/texts/works/works.en.md';
import { html as asideJa } from '../../assets/texts/works/works.ja.md';
import worksVrcUi from '../../assets/works/black.kit.vrcui.webp';
import worksVrcUiSrcset from '../../assets/works/black.kit.vrcui.webp?w=290;400;710;1024&as=srcset';
import worksDantalion from '../../assets/works/dantalion.webp';
import worksDantalionSrcset from '../../assets/works/dantalion.webp?w=290;400;710;1024&as=srcset';
import worksGraphig from '../../assets/works/graphig.webp';
import worksGraphigSrcset from '../../assets/works/graphig.webp?w=290;400;710;1024&as=srcset';
import worksLaunchpadIcons from '../../assets/works/launchpad-icons.webp';
import worksLaunchpadIconsSrcset from '../../assets/works/launchpad-icons.webp?w=290;400;710;1024&as=srcset';
import {
  createI18NDict,
  createI18NText,
  useLanguage,
  useTranslator,
} from '../../modules/createI18N.js';
import { Article } from '../atoms/Article.js';
import { WorkCard } from '../molecules/WorkCard.js';

/**
 * The `sizes` attribute for every {@link WorkCard} image, derived from
 * `organisms/Works.tsx`'s own always-1-column list (`flex flex-col`)
 * together with `molecules/WorkCard.tsx`'s figure. Below `lg`, the
 * figure stacks full-width above the card body (100% of the column),
 * so its slot follows the default `Article` container's own step
 * function: 100% below `sm`, a fixed 640px cap through the `sm`-`md`
 * band, then 704px (768 - 64px padding) through the `md`-`lg` band. At
 * `lg` and up, `lg:card-side` switches the card to a horizontal layout
 * and the figure is capped by its own `max-w-*` instead (`lg:max-w-72
 * xl:max-w-96`, unchanged from `xl` through `2xl`), which is narrower
 * than a full column at either breakpoint.
 *
 * The `w=` list's top step (the source assets' native 1024 width)
 * exists purely for device-pixel-ratio headroom on the full-slot bands
 * above -- a narrow phone at a common DPR of 2-3 needs 780-1290 device
 * pixels for a 100vw/640px slot, which this component's own 710px
 * mid-tier step cannot cover without upscaling.
 */
const WORK_CARD_SIZES =
  '(min-width: 1280px) 384px, (min-width: 1024px) 288px, (min-width: 768px) 704px, (min-width: 640px) 640px, 100vw';

/** The accessor for the aside translated markdown. */
const asideTranslator = createI18NText({ en: asideEn, ja: asideJa });

/** The accessor for the Dantalion translated attributes. */
const dantalionAttrTranslator = createI18NDict({
  en: dantalionEnA,
  ja: dantalionJaA,
});

/** The accessor for the Dantalion translated markdown. */
const dantalionBodyTranslator = createI18NText({
  en: dantalionEn,
  ja: dantalionJa,
});

/** The accessor for the Graphig translated attributes. */
const graphigAttrTranslator = createI18NDict({
  en: graphigEnA,
  ja: graphigJaA,
});

/** The accessor for the Graphig translated markdown. */
const graphigBodyTranslator = createI18NText({ en: graphigEn, ja: graphigJa });

/** The accessor for the Launchpad Icons translated attributes. */
const launchpadIconsAttrTranslator = createI18NDict({ en: liEnA, ja: liJaA });

/** The accessor for the Launchpad Icons translated markdown. */
const launchpadIconsBodyTranslator = createI18NText({ en: liEn, ja: liJa });

/** The accessor for the VRCUI translated attributes. */
const vrcuiAttrTranslator = createI18NDict({ en: vrcuiEnA, ja: vrcuiJaA });

/** The accessor for the VRCUI translated markdown. */
const vrcuiBodyTranslator = createI18NText({ en: vrcuiEn, ja: vrcuiJa });

/**
 * The works component.
 * @returns The component.
 */
export const Works: Component = () => {
  const language = useLanguage();
  const aside = asideTranslator(language);
  const dantalionAttr = dantalionAttrTranslator(language);
  const dantalionBody = dantalionBodyTranslator(language);
  const graphigAttr = graphigAttrTranslator(language);
  const graphigBody = graphigBodyTranslator(language);
  const launchpadIconsAttr = launchpadIconsAttrTranslator(language);
  const launchpadIconsBody = launchpadIconsBodyTranslator(language);
  const vrcuiAttr = vrcuiAttrTranslator(language);
  const vrcuiBody = vrcuiBodyTranslator(language);
  const t = useTranslator();
  return (
    <Article heading={t('worksHeading')}>
      <p>{t('worksDescription')}</p>
      <ul class="flex flex-col gap-4 py-20">
        <WorkCard
          alt={dantalionAttr('alt')}
          class="prose [&_a]:link"
          heading={dantalionAttr('heading')}
          href={dantalionAttr('href')}
          innerHTML={dantalionBody('text')}
          labelMore={t('learnMore')}
          released={t('released', { year: 2021 })}
          sizes={WORK_CARD_SIZES}
          src={worksDantalion}
          srcset={worksDantalionSrcset}
        />
        <WorkCard
          alt={vrcuiAttr('alt')}
          class="prose [&_a]:link"
          heading={vrcuiAttr('heading')}
          href={vrcuiAttr('href')}
          innerHTML={vrcuiBody('text')}
          labelMore={t('learnMore')}
          released={t('released', { year: 2024 })}
          sizes={WORK_CARD_SIZES}
          src={worksVrcUi}
          srcset={worksVrcUiSrcset}
        />
        <WorkCard
          alt={launchpadIconsAttr('alt')}
          class="prose [&_a]:link"
          heading={launchpadIconsAttr('heading')}
          href={launchpadIconsAttr('href')}
          innerHTML={launchpadIconsBody('text')}
          labelMore={t('learnMore')}
          released={t('released', { year: 2024 })}
          sizes={WORK_CARD_SIZES}
          src={worksLaunchpadIcons}
          srcset={worksLaunchpadIconsSrcset}
        />
        <WorkCard
          alt={graphigAttr('alt')}
          class="prose [&_a]:link"
          heading={graphigAttr('heading')}
          href={graphigAttr('href')}
          innerHTML={graphigBody('text')}
          labelMore={t('learnMore')}
          released={t('released', { year: 2019 })}
          sizes={WORK_CARD_SIZES}
          src={worksGraphig}
          srcset={worksGraphigSrcset}
        />
      </ul>
      <aside
        aria-label={t('worksMore')}
        class="prose [&_a]:link [&_a]:link-primary [&_a]:font-semibold"
        innerHTML={aside('text')}
      />
    </Article>
  );
};
