import type { RouteSectionProps } from '@solidjs/router';
import type { Component } from 'solid-js';
import { Hero } from '../components/organisms/Hero.js';
import { Activities } from '../components/organisms/Activities.js';
import { ActivitiesCarousel } from '../components/organisms/ActivitiesCarousel.js';
import { Calendar } from '../components/organisms/Calendar.js';
import { Events } from '../components/organisms/Events.js';
import { Links } from '../components/organisms/Links.js';
import { Works } from '../components/organisms/Works.js';

/**
 * The top page.
 * @returns The component.
 */
const Index: Component<RouteSectionProps> = () => (
  <>
    <Hero />
    <ActivitiesCarousel />
    <Activities />
    <Works />
    <Events />
    <Calendar />
    <Links />
  </>
);

export default Index;
