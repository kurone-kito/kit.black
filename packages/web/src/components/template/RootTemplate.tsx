import { MetaProvider } from '@solidjs/meta';
import type { RouteSectionProps } from '@solidjs/router';
import type { Component } from 'solid-js';
import { Suspense } from 'solid-js';
import constants from '../../constants.json';
import { LinkList } from '../atoms/meta/LinkList.js';
import { MetaList } from '../atoms/meta/MetaList.js';
import { Ogp } from '../atoms/meta/Ogp.js';
import { Title } from '../atoms/meta/Title.js';
import { XCard } from '../atoms/meta/XCard.js';
import { Footer } from '../organisms/Footer';

/** The images for the Open Graph protocol. */
const images = [constants.favicon.url] as const;

/**
 * The root template component.
 * @param props The properties.
 * @returns The component.
 */
export const RootTemplate: Component<RouteSectionProps> = (props) => (
  <MetaProvider>
    <Title siteName={constants.site.name} />
    <MetaList
      author={constants.author.name}
      description={constants.description}
      keywords={constants.keywords}
    />
    <Ogp
      imageHeight={constants.favicon.size}
      images={images}
      imageType={constants.favicon.type}
      imageWidth={constants.favicon.size}
      language="ja"
      siteName={constants.site.name}
      url={constants.site.url}
    />
    <XCard
      author={constants.author.name}
      image={constants.favicon.url}
      siteName={constants.site.name}
    />
    <LinkList
      faviconType={constants.favicon.type}
      faviconUrl={constants.favicon.path}
    />
    <main>
      <Suspense fallback={<div>Loading...</div>}>{props.children}</Suspense>
    </main>
    <Footer />
  </MetaProvider>
);
