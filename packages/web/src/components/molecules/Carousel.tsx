import type { Component } from 'solid-js';
import { createMediaQuery } from '@solid-primitives/media';
import {
  createEffect,
  createSignal,
  Index,
  onCleanup,
  onMount,
} from 'solid-js';
import { twMerge } from 'tailwind-merge';
import { CarouselItem } from '../atoms/CarouselItem.js';

/** Type definition that represents a carousel item. */
export type Item = readonly [image: string, alt: string];

/** Type definition for the properties. */
export interface SceneCarouselProps {
  /** The CSS classes. */
  readonly class?: string | undefined;

  /** The items. */
  readonly items: readonly Item[];

  /**
   * The accessible name that describes what the carousel contains.
   * Required because the container is keyboard-focusable
   * (`tabindex="0"`); an unnamed focusable region is an accessibility
   * regression.
   */
  readonly label: string;
}

/** How often autoplay advances to the next item, in milliseconds. */
const AUTOPLAY_INTERVAL_MS = 3_000;

/**
 * The attribute marking the currently active item, purely as an
 * inert hook (no CSS binds to it): a test-observable, non-ARIA signal
 * for {@link activeIndex} that doesn't risk any accessibility surface.
 */
const ACTIVE_ATTRIBUTE = 'data-carousel-active';

/**
 * The carousel component.
 *
 * Autoplays by advancing one item every {@link AUTOPLAY_INTERVAL_MS}.
 * Any manual interaction (scroll, touch, pointer, keyboard) postpones
 * the next advance by the same interval, and autoplay pauses entirely
 * while the pointer hovers the carousel, while keyboard focus is
 * inside it, while the tab is not visible, or when the user agent
 * requests `prefers-reduced-motion: reduce` (in which case the timer
 * never starts at all). The timer only starts after client mount, so
 * it never runs during SSR/prerendering and never affects the
 * prerendered markup.
 *
 * Each advance re-derives its starting point from the carousel's
 * actual current scroll position (see {@link nearestIndex} below)
 * rather than trusting a remembered index, so autoplay resuming after
 * a manual scroll continues from wherever the visitor left it instead
 * of snapping back to a stale position.
 * @param props The properties.
 * @returns The component.
 */
export const Carousel: Component<SceneCarouselProps> = (props) => {
  let listRef: HTMLUListElement | undefined;
  let timer: ReturnType<typeof setTimeout> | undefined;
  const [activeIndex, setActiveIndex] = createSignal(0);
  const [hovered, setHovered] = createSignal(false);
  const [focused, setFocused] = createSignal(false);
  const [visible, setVisible] = createSignal(true);
  const [mounted, setMounted] = createSignal(false);
  const prefersReducedMotion = createMediaQuery(
    '(prefers-reduced-motion: reduce)',
  );
  const paused = () => hovered() || focused() || !visible();

  /**
   * Finds the item nearest to the carousel's current scroll position.
   * Falls back to the last known {@link activeIndex} when the
   * container has no measurable layout yet (for example, in a test
   * environment with no real layout engine), so autoplay stays
   * deterministic wherever real geometry is unavailable.
   * @returns The nearest item's index.
   */
  const nearestIndex = (): number => {
    if (!listRef || listRef.clientWidth === 0 || props.items.length === 0) {
      return activeIndex();
    }
    const containerRect = listRef.getBoundingClientRect();
    const containerCenter = containerRect.left + containerRect.width / 2;
    let closest = 0;
    let closestDistance = Number.POSITIVE_INFINITY;
    for (const [i, child] of Array.from(listRef.children).entries()) {
      const rect = child.getBoundingClientRect();
      const distance = Math.abs(rect.left + rect.width / 2 - containerCenter);
      if (distance < closestDistance) {
        closestDistance = distance;
        closest = i;
      }
    }
    return closest;
  };

  const clearTimer = () => {
    if (timer !== undefined) {
      clearTimeout(timer);
      timer = undefined;
    }
  };

  /**
   * (Re)schedules the next autoplay advance, replacing any pending
   * one. Does nothing while unmounted, reduced-motion is requested, or
   * autoplay is paused -- callers rely on this to both start the
   * initial timer and to postpone it on manual interaction.
   *
   * Also bound as the `scroll` handler, so autoplay's own smooth
   * scroll counts as activity and pushes the next advance out by up to
   * one interval too -- an accepted, self-correcting pacing nuance
   * (never a stuck timer), consistent with "advance after N seconds of
   * inactivity" rather than a hard fixed-cadence clock.
   */
  const scheduleAdvance = () => {
    clearTimer();
    if (
      !mounted() ||
      prefersReducedMotion() ||
      paused() ||
      props.items.length <= 1
    ) {
      return;
    }
    timer = setTimeout(() => {
      setActiveIndex((nearestIndex() + 1) % props.items.length);
    }, AUTOPLAY_INTERVAL_MS);
  };

  createEffect(() => {
    // Re-schedule whenever autoplay eligibility changes.
    mounted();
    prefersReducedMotion();
    paused();
    activeIndex();
    scheduleAdvance();
  });

  createEffect(() => {
    if (!listRef) return;
    const index = activeIndex();
    const children = Array.from(listRef.children);
    for (const [i, child] of children.entries()) {
      if (i === index) child.setAttribute(ACTIVE_ATTRIBUTE, 'true');
      else child.removeAttribute(ACTIVE_ATTRIBUTE);
    }
    const target = children[index];
    if (!(target instanceof HTMLElement)) return;
    // Scroll only this container's own horizontal position -- never
    // `target.scrollIntoView()`, which would also walk and scroll
    // every scrollable ancestor up to the page itself, yanking a
    // visitor who has since scrolled elsewhere on the page back to
    // the carousel on every autoplay tick.
    const left =
      target.offsetLeft + target.offsetWidth / 2 - listRef.clientWidth / 2;
    listRef.scrollTo?.({ behavior: 'smooth', left });
  });

  onMount(() => {
    setVisible(document.visibilityState === 'visible');
    const handleVisibilityChange = () =>
      setVisible(document.visibilityState === 'visible');
    document.addEventListener('visibilitychange', handleVisibilityChange);
    onCleanup(() =>
      document.removeEventListener('visibilitychange', handleVisibilityChange),
    );
    onCleanup(clearTimer);
    setMounted(true);
  });

  return (
    <div class="bg-base-100 px-0.5 py-12">
      <ul
        aria-label={props.label}
        class={twMerge(
          'carousel carousel-center focus-visible:outline-primary aspect-[19/9] h-auto w-full space-x-4 px-4 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 md:aspect-[27/9] xl:aspect-[28/9] 2xl:aspect-[43/9]',
          props.class,
        )}
        onFocusIn={() => setFocused(true)}
        onFocusOut={() => setFocused(false)}
        onKeyDown={scheduleAdvance}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        onPointerDown={scheduleAdvance}
        onScroll={scheduleAdvance}
        onTouchStart={scheduleAdvance}
        ref={listRef}
        tabindex="0"
      >
        <Index each={props.items}>
          {(index) => (
            <CarouselItem
              alt={index()[1]}
              class="carousel-item h-full w-auto cursor-ew-resize"
              height={720}
              src={index()[0]}
              width={1280}
            />
          )}
        </Index>
      </ul>
    </div>
  );
};
