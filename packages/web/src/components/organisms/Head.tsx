import { useLocation } from '@solidjs/router';
import type { Component } from 'solid-js';
import { createMemo } from 'solid-js';
import constants from '../../constants.json';
import { useLanguage, useTranslator } from '../../modules/createI18N.js';
import { useLanguageHref } from '../../modules/useLanguageHref.js';
import { Head as InternalHead } from '../molecules/Head.js';

/** The images for the Open Graph protocol. */
const images = [constants.favicon.url] as const;

/** The OGP `og:locale` value (`language_TERRITORY`) for each language. */
const ogLocales = { en: 'en_US', ja: 'ja_JP' } as const;

/**
 * The head metadata component.
 * @returns The component.
 */
export const Head: Component = () => {
  const t = useTranslator();
  const language = useLanguage();
  const location = useLocation();
  const jaHref = useLanguageHref('ja');
  const enHref = useLanguageHref('en');

  /** The absolute URL of the current page. */
  const pageUrl = createMemo(() => `${constants.site.url}${location.pathname}`);

  /** The `hreflang` alternate-language links for the current page. */
  const alternates = createMemo(() => [
    { hreflang: 'ja', href: `${constants.site.url}${jaHref()}` },
    { hreflang: 'en', href: `${constants.site.url}${enHref()}` },
    { hreflang: 'x-default', href: `${constants.site.url}/` },
  ]);

  return (
    <InternalHead
      alternates={alternates()}
      appleTouchIconUrl={constants.icons.appleTouchIcon}
      author={t('author')}
      authorUrl={constants.author.url}
      canonicalUrl={pageUrl()}
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
      language={ogLocales[language()]}
      licenseUrl={constants.licenseUrl}
      manifestUrl={constants.icons.manifest}
      next={undefined}
      prev={undefined}
      siteName={constants.site.name}
      url={pageUrl()}
    />
  );
};
