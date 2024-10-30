import type { Component } from 'solid-js';
import { html as en } from '../../assets/texts/hero.en.md';
import { html as ja } from '../../assets/texts/hero.ja.md';
import {
  createI18NText,
  useLanguage,
  useTranslator,
} from '../../modules/createI18N';
import { Hero as AtomsHero } from '../atoms/Hero.js';
import { KitoWithLogo } from '../molecules/KitoWithLogo.js';

/** The accessor for the translated markdown. */
const mdTranslator = createI18NText({ en, ja } as const);

/**
 * The hero component
 * @returns The component.
 */
export const Hero: Component = () => {
  const md = mdTranslator(useLanguage());
  const t = useTranslator();
  return (
    <AtomsHero
      class="prose [&_strong]:text-base-content/80 [&_a]:link [&_a]:lg:link-hover [&_blockquote]:font-serif [&_blockquote]:text-lg [&_blockquote]:italic [&_blockquote]:opacity-80 [&_blockquote]:xl:text-2xl [&_strong]:font-bold [&_ul]:list-inside [&_ul]:list-disc"
      innerHTML={md('text')}
      logo={
        <KitoWithLogo
          altKito={t('avatarKito')}
          altMomoneko={t('avatarMomoneko')}
        />
      }
    />
  );
};
