import type { Component } from 'solid-js';
import constants from '../../constants.json';
import { useTranslator } from '../../modules/createI18N.js';
import { Head as InternalHead } from '../molecules/Head.js';

/** The images for the Open Graph protocol. */
const images = [constants.favicon.url] as const;

/**
 * The head metadata component.
 * @returns The component.
 */
export const Head: Component = () => {
  const t = useTranslator();
  return (
    <InternalHead
      author={t('author')}
      authorUrl={constants.author.url}
      colorDark={constants.color.dark}
      colorLight={constants.color.light}
      description={t('siteDescription')}
      faviconType={constants.favicon.type}
      faviconUrl={constants.favicon.path}
      keywords={constants.keywords}
      imageAlt={t('author')}
      imageHeight={constants.favicon.size}
      images={images}
      imageType={constants.favicon.type}
      imageWidth={constants.favicon.size}
      language="ja"
      licenseUrl={constants.licenseUrl}
      next={undefined}
      prev={undefined}
      siteName={constants.site.name}
      url={constants.site.url}
    />
  );
};
