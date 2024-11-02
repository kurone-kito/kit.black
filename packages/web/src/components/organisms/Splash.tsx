import type { Component } from 'solid-js';
import { createSignal, onMount } from 'solid-js';
import { Splash as MoleculesSplash } from '../molecules/Splash.js';

/** The duration of the splash animation. */
export const DURATION = 3_000;

/**
 * The splash component.
 * @returns The component.
 */
export const Splash: Component = () => {
  const [isMounted, setMounted] = createSignal<boolean>(false);
  onMount(() => setMounted(true));
  return <MoleculesSplash animation={isMounted()} />;
};
