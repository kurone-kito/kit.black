import { A } from '@solidjs/router';
import type { Component } from 'solid-js';
import { useLanguageHref } from '../../modules/useLanguageHref.js';
import { useTranslator } from '../../modules/createI18N.js';
import { LanguageChanger as InternalChanger } from '../molecules/LanguageChanger.js';

/**
 * The language changer.
 * @returns The component.
 */
export const LanguageChanger: Component = () => {
  const enLink = useLanguageHref('en');
  const jaLink = useLanguageHref('ja');
  const t = useTranslator();
  return (
    <InternalChanger
      as={A}
      enHref={enLink()}
      jaHref={jaLink()}
      label={t('languageSelection')}
    />
  );
};
