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
      appleTouchIconUrl={constants.icons.appleTouchIcon}
      author={t('author')}
      authorUrl={constants.author.url}
      colorDark={constants.color.dark}
      colorLight={constants.color.light}
      description={t('siteDescription')}
      icon16Url={constants.icons.png16}
      icon32Url={constants.icons.png32}
      iconIcoUrl={constants.icons.ico}
      keywords={constants.keywords}
      imageAlt={t('author')}
      imageHeight={constants.favicon.size}
      images={images}
      imageType={constants.favicon.type}
      imageWidth={constants.favicon.size}
      language="ja"
      licenseUrl={constants.licenseUrl}
      manifestUrl={constants.icons.manifest}
      next={undefined}
      prev={undefined}
      siteName={constants.site.name}
      url={constants.site.url}
    />
  );
};
