import type { RouteSectionProps } from '@solidjs/router';
import type { Component } from 'solid-js';
import { Article } from '../components/atoms/Article.js';

/**
 * The top page.
 * @returns The component.
 */
const Index: Component<RouteSectionProps> = () => (
  <Article heading="Top page">TODO: Add the content here.</Article>
);

export default Index;
