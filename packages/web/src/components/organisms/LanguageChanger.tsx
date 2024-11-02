import { A } from '@solidjs/router';
import type { Component } from 'solid-js';
import { useLanguageHref } from '../../modules/useLanguageHref.js';
import { LanguageChanger as InternalChanger } from '../molecules/LanguageChanger.js';

/**
 * The language changer.
 * @returns The component.
 */
export const LanguageChanger: Component = () => {
  const enLink = useLanguageHref('en');
  const jaLink = useLanguageHref('ja');
  return <InternalChanger as={A} enHref={enLink()} jaHref={jaLink()} />;
};
