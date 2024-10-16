import type { Component } from 'solid-js';
import constants from '../../constants.json';
import { Head as InternalHead } from '../molecules/Head.js';

/** The images for the Open Graph protocol. */
const images = [constants.favicon.url] as const;

/**
 * The head metadata component.
 * @returns The component.
 */
export const Head: Component = () => (
  <InternalHead
    author={constants.author.name}
    authorUrl={constants.author.url}
    colorDark={constants.color.dark}
    colorLight={constants.color.light}
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
);
