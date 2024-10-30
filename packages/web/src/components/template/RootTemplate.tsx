import { MetaProvider } from '@solidjs/meta';
import type { RouteSectionProps } from '@solidjs/router';
import type { Component } from 'solid-js';
import { Suspense } from 'solid-js';
import constants from '../../constants.json';
import { Footer } from '../organisms/Footer';
import { Head } from '../molecules/Head';

/** The images for the Open Graph protocol. */
const images = [constants.favicon.url] as const;

/**
 * The root template component.
 * @param props The properties.
 * @returns The component.
 */
export const RootTemplate: Component<RouteSectionProps> = (props) => (
  <MetaProvider>
    <Head
      author={constants.author.name}
      authorUrl={constants.author.url}
      colorDark={undefined}
      colorLight={undefined}
      description={constants.description}
      faviconType={constants.favicon.type}
      faviconUrl={constants.favicon.path}
      keywords={constants.keywords}
      imageAlt={constants.author.name}
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
    <main>
      <Suspense fallback={<div>Loading...</div>}>{props.children}</Suspense>
    </main>
    <Footer />
  </MetaProvider>
);
