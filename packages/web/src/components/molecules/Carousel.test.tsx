import { cleanup, render } from '@solidjs/testing-library';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import type { Item } from './Carousel.js';
import { Carousel } from './Carousel.js';

/** The items shared by every test in this file. */
const items: readonly Item[] = Array.from(
  { length: 4 },
  (_, i) => [`https://example.test/${i}.webp`, `Item ${i}`] as const,
);

/**
 * Stubs `window.matchMedia` so `(prefers-reduced-motion: reduce)`
 * reports a fixed, controllable state. jsdom has no native
 * `matchMedia` implementation. Mirrors
 * `src/modules/createDarkMode.test.ts`'s `stubMatchMedia` helper.
 * @param matches Whether the reduced-motion media query should report
 *   a match.
 */
const stubMatchMedia = (matches: boolean): void => {
  vi.stubGlobal(
    'matchMedia',
    vi.fn().mockImplementation((query: string) => ({
      addEventListener: vi.fn(),
      addListener: vi.fn(),
      dispatchEvent: vi.fn(),
      matches,
      media: query,
      onchange: null,
      removeEventListener: vi.fn(),
      removeListener: vi.fn(),
    })),
  );
};

/**
 * Dispatches a plain DOM event on the given element.
 * @param target The element to dispatch on.
 * @param type The event type.
 */
const fire = (target: EventTarget, type: string): void => {
  target.dispatchEvent(new Event(type, { bubbles: true }));
};

/**
 * Reads which item the carousel currently marks as active, via the
 * `data-carousel-active` test hook -- avoids depending on the mocked
 * `scrollTo` call arguments, which jsdom's zero-layout geometry would
 * make indistinguishable across indices.
 * @param container The rendered container.
 * @returns The active item's index, or -1 if none is marked.
 */
const activeIndexOf = (container: HTMLElement): number =>
  [...container.querySelectorAll('li')].findIndex((li) =>
    li.hasAttribute('data-carousel-active'),
  );

/**
 * Fakes a measurable layout for the carousel and its items, so
 * {@link Carousel}'s scroll-position resync logic has real geometry to
 * read instead of falling back to the last known index. `nearIndex`
 * is reported as centered; every other item is reported far away.
 * @param container The rendered container.
 * @param nearIndex The index that should read as closest to center.
 */
const stubLayout = (container: HTMLElement, nearIndex: number): void => {
  const ul = container.querySelector('ul');
  if (!ul) throw new Error('ul not found');
  Object.defineProperty(ul, 'clientWidth', { configurable: true, value: 300 });
  vi.spyOn(ul, 'getBoundingClientRect').mockReturnValue(
    new DOMRect(0, 0, 300, 200),
  );
  const lis = [...container.querySelectorAll('li')];
  for (const [i, li] of lis.entries()) {
    vi.spyOn(li, 'getBoundingClientRect').mockReturnValue(
      i === nearIndex
        ? new DOMRect(140, 0, 20, 200)
        : new DOMRect(10_000, 0, 20, 200),
    );
  }
};

beforeEach(() => {
  vi.useFakeTimers();
  Element.prototype.scrollTo = vi.fn();
  stubMatchMedia(false);
});

afterEach(() => {
  cleanup();
  vi.useRealTimers();
  vi.unstubAllGlobals();
  Object.defineProperty(document, 'visibilityState', {
    configurable: true,
    get: () => 'visible',
  });
});

describe('Carousel', () => {
  it('scrolls only its own container, never an ancestor, on every advance', () => {
    const { container } = render(() => (
      <Carousel items={items} label="Example carousel" />
    ));
    const scrollTo = vi.mocked(Element.prototype.scrollTo);

    vi.advanceTimersByTime(3_000);

    // `scrollTo` is called on the `<ul>` itself, never on a `<li>` or
    // an ancestor -- unlike `Element.scrollIntoView`, it never walks
    // or scrolls anything outside this element.
    const ul = container.querySelector('ul');
    expect(scrollTo.mock.instances.at(-1)).toBe(ul);
    expect(scrollTo).toHaveBeenLastCalledWith(
      expect.objectContaining({ behavior: 'smooth' }),
    );
  });

  it("computes the scroll target from bounding-rect deltas and the container's own scrollLeft, not offsetLeft", () => {
    const { container } = render(() => (
      <Carousel items={items} label="Example carousel" />
    ));
    const ul = container.querySelector('ul');
    if (!ul) throw new Error('ul not found');
    const lis = [...container.querySelectorAll('li')];

    // The container sits at viewport x=100 and is 300px wide (center
    // at x=250), already scrolled 50px, and is itself offset from a
    // non-positioned ancestor -- `offsetLeft` would read a value tied
    // to that ancestor chain instead of this geometry.
    Object.defineProperty(ul, 'scrollLeft', {
      configurable: true,
      value: 50,
    });
    vi.spyOn(ul, 'getBoundingClientRect').mockReturnValue(
      new DOMRect(100, 0, 300, 200),
    );
    // Item 1 (the next item autoplay advances to) sits at viewport
    // x=440, 40px wide (center at x=460).
    vi.spyOn(lis[1] as HTMLElement, 'getBoundingClientRect').mockReturnValue(
      new DOMRect(440, 0, 40, 200),
    );

    const scrollTo = vi.mocked(Element.prototype.scrollTo);
    vi.advanceTimersByTime(3_000);

    // left = scrollLeft(50) + (targetLeft(440) - containerLeft(100) +
    // targetWidth(40)/2)(360) - containerWidth(300)/2(150) = 260.
    expect(scrollTo).toHaveBeenLastCalledWith({
      behavior: 'smooth',
      left: 260,
    });
  });

  it('advances one item after 3 seconds of inactivity, repeatedly, while mounted', () => {
    const { container } = render(() => (
      <Carousel items={items} label="Example carousel" />
    ));

    vi.advanceTimersByTime(3_000);
    expect(activeIndexOf(container)).toBe(1);

    vi.advanceTimersByTime(3_000);
    expect(activeIndexOf(container)).toBe(2);

    vi.advanceTimersByTime(3_000);
    expect(activeIndexOf(container)).toBe(3);
  });

  it('loops back to the first item after reaching the last', () => {
    const { container } = render(() => (
      <Carousel items={items} label="Example carousel" />
    ));

    for (let i = 0; i < items.length; i += 1) {
      vi.advanceTimersByTime(3_000);
    }
    expect(activeIndexOf(container)).toBe(0);
  });

  it('resets the pending timer on a manual interaction; no advance occurs until 3 more seconds of inactivity', () => {
    const { container } = render(() => (
      <Carousel items={items} label="Example carousel" />
    ));
    const ul = container.querySelector('ul');
    if (!ul) throw new Error('ul not found');

    vi.advanceTimersByTime(2_000);
    fire(ul, 'scroll');
    vi.advanceTimersByTime(2_000);
    expect(activeIndexOf(container)).toBe(0);

    vi.advanceTimersByTime(1_000);
    expect(activeIndexOf(container)).toBe(1);
  });

  it('never starts the timer when prefers-reduced-motion: reduce is requested', () => {
    stubMatchMedia(true);
    const { container } = render(() => (
      <Carousel items={items} label="Example carousel" />
    ));
    expect(vi.getTimerCount()).toBe(0);

    vi.advanceTimersByTime(60_000);
    expect(activeIndexOf(container)).toBe(0);
  });

  it('scrolls instantly instead of smoothly when prefers-reduced-motion: reduce is requested', () => {
    stubMatchMedia(true);
    const { container } = render(() => (
      <Carousel items={items} label="Example carousel" />
    ));
    const ul = container.querySelector('ul');
    if (!ul) throw new Error('ul not found');
    const scrollTo = vi.mocked(Element.prototype.scrollTo);

    // Autoplay never runs under reduced motion, but the position-sync
    // effect (the only thing that can call `scrollTo`) still applies
    // `prefers-reduced-motion` independently -- defense-in-depth
    // against a future direct `setActiveIndex` caller re-animating.
    // `'instant'`, not `'auto'`: the `carousel` class sets CSS
    // `scroll-behavior: smooth`, which `'auto'` would defer to instead
    // of overriding.
    expect(scrollTo).toHaveBeenLastCalledWith(
      expect.objectContaining({ behavior: 'instant' }),
    );
  });

  it('does not advance while the tab is hidden, and resumes once it is visible again', () => {
    const { container } = render(() => (
      <Carousel items={items} label="Example carousel" />
    ));

    Object.defineProperty(document, 'visibilityState', {
      configurable: true,
      get: () => 'hidden',
    });
    fire(document, 'visibilitychange');
    vi.advanceTimersByTime(10_000);
    expect(activeIndexOf(container)).toBe(0);

    Object.defineProperty(document, 'visibilityState', {
      configurable: true,
      get: () => 'visible',
    });
    fire(document, 'visibilitychange');
    vi.advanceTimersByTime(3_000);
    expect(activeIndexOf(container)).toBe(1);
  });

  it('pauses while hovered, and resumes once the pointer leaves', () => {
    const { container } = render(() => (
      <Carousel items={items} label="Example carousel" />
    ));
    const ul = container.querySelector('ul');
    if (!ul) throw new Error('ul not found');

    fire(ul, 'mouseenter');
    vi.advanceTimersByTime(10_000);
    expect(activeIndexOf(container)).toBe(0);

    fire(ul, 'mouseleave');
    vi.advanceTimersByTime(3_000);
    expect(activeIndexOf(container)).toBe(1);
  });

  it('pauses while keyboard focus is inside it, and resumes once focus leaves', () => {
    const { container } = render(() => (
      <Carousel items={items} label="Example carousel" />
    ));
    const ul = container.querySelector('ul');
    if (!ul) throw new Error('ul not found');

    fire(ul, 'focusin');
    vi.advanceTimersByTime(10_000);
    expect(activeIndexOf(container)).toBe(0);

    fire(ul, 'focusout');
    vi.advanceTimersByTime(3_000);
    expect(activeIndexOf(container)).toBe(1);
  });

  it('pausing on hover and focus together lifts only once both end', () => {
    const { container } = render(() => (
      <Carousel items={items} label="Example carousel" />
    ));
    const ul = container.querySelector('ul');
    if (!ul) throw new Error('ul not found');

    fire(ul, 'mouseenter');
    fire(ul, 'focusin');
    vi.advanceTimersByTime(10_000);
    expect(activeIndexOf(container)).toBe(0);

    fire(ul, 'mouseleave');
    vi.advanceTimersByTime(10_000);
    expect(activeIndexOf(container)).toBe(0);

    fire(ul, 'focusout');
    vi.advanceTimersByTime(3_000);
    expect(activeIndexOf(container)).toBe(1);
  });

  it('resumes autoplay from the actual scroll position rather than a stale remembered index', () => {
    const { container } = render(() => (
      <Carousel items={items} label="Example carousel" />
    ));
    const ul = container.querySelector('ul');
    if (!ul) throw new Error('ul not found');

    // Simulate the visitor manually scrolling straight to item 2
    // (skipping the internal activeIndex signal, still at 0) and
    // resting there past the interval.
    stubLayout(container, 2);
    fire(ul, 'scroll');
    vi.advanceTimersByTime(3_000);

    expect(activeIndexOf(container)).toBe(3);
  });

  it('keeps autoplaying even when the resync-derived next index numerically equals the current one', () => {
    const { container } = render(() => (
      <Carousel items={items} label="Example carousel" />
    ));
    const ul = container.querySelector('ul');
    if (!ul) throw new Error('ul not found');

    // First tick uses the default (no measurable layout) fallback, so
    // it advances 0 -> 1 normally.
    vi.advanceTimersByTime(3_000);
    expect(activeIndexOf(container)).toBe(1);

    // Now the visitor manually scrolls back near item 0. The next
    // resync-derived advance is (0 + 1) % 4 = 1 -- numerically identical to
    // the already-current activeIndex signal value. A default-equals
    // signal would treat that `setActiveIndex` as a no-op and never
    // notify, silently stopping the reschedule effect from running
    // again -- this pins that autoplay survives the collision instead.
    stubLayout(container, 0);
    fire(ul, 'scroll');
    vi.advanceTimersByTime(3_000);
    expect(activeIndexOf(container)).toBe(1);
    expect(vi.getTimerCount()).toBe(1);

    // Drop back to the no-measurable-layout fallback (nearestIndex
    // now reads the current signal directly again) to confirm the
    // rescheduled timer keeps advancing on its own, rather than only
    // checking that one timer object exists.
    Object.defineProperty(ul, 'clientWidth', { configurable: true, value: 0 });
    vi.advanceTimersByTime(3_000);
    expect(activeIndexOf(container)).toBe(2);
  });

  it('does not schedule a timer for an empty item list', () => {
    render(() => <Carousel items={[]} label="Example carousel" />);
    expect(vi.getTimerCount()).toBe(0);
  });

  it('does not schedule a timer for a single-item list', () => {
    render(() => (
      <Carousel items={items.slice(0, 1)} label="Example carousel" />
    ));
    expect(vi.getTimerCount()).toBe(0);
  });
});
