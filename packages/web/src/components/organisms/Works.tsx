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
import worksDantalion from '../../assets/works/dantalion.webp';
import worksGraphig from '../../assets/works/graphig.webp';
import worksLaunchpadIcons from '../../assets/works/launchpad-icons.webp';
import {
  createI18NDict,
  createI18NText,
  useLanguage,
  useTranslator,
} from '../../modules/createI18N.js';
import { Article } from '../atoms/Article.js';
import { WorkCard } from '../molecules/WorkCard.js';

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
          src={worksDantalion}
        />
        <WorkCard
          alt={vrcuiAttr('alt')}
          class="prose [&_a]:link"
          heading={vrcuiAttr('heading')}
          href={vrcuiAttr('href')}
          innerHTML={vrcuiBody('text')}
          labelMore={t('learnMore')}
          released={t('released', { year: 2024 })}
          src={worksVrcUi}
        />
        <WorkCard
          alt={launchpadIconsAttr('alt')}
          class="prose [&_a]:link"
          heading={launchpadIconsAttr('heading')}
          href={launchpadIconsAttr('href')}
          innerHTML={launchpadIconsBody('text')}
          labelMore={t('learnMore')}
          released={t('released', { year: 2024 })}
          src={worksLaunchpadIcons}
        />
        <WorkCard
          alt={graphigAttr('alt')}
          class="prose [&_a]:link"
          heading={graphigAttr('heading')}
          href={graphigAttr('href')}
          innerHTML={graphigBody('text')}
          labelMore={t('learnMore')}
          released={t('released', { year: 2019 })}
          src={worksGraphig}
        />
      </ul>
      <aside
        class="prose [&_a]:link [&_a]:link-primary [&_a]:font-semibold"
        innerHTML={aside('text')}
      />
    </Article>
  );
};
