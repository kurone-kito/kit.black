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
  Element.prototype.scrollIntoView = vi.fn();
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
  it('advances one item after 3 seconds of inactivity, repeatedly, while mounted', () => {
    const { container } = render(() => (
      <Carousel items={items} label="Example carousel" />
    ));
    const scrollIntoView = vi.mocked(Element.prototype.scrollIntoView);
    const lis = () => [...container.querySelectorAll('li')];

    vi.advanceTimersByTime(3_000);
    expect(scrollIntoView.mock.instances.at(-1)).toBe(lis()[1]);

    vi.advanceTimersByTime(3_000);
    expect(scrollIntoView.mock.instances.at(-1)).toBe(lis()[2]);

    vi.advanceTimersByTime(3_000);
    expect(scrollIntoView.mock.instances.at(-1)).toBe(lis()[3]);
  });

  it('loops back to the first item after reaching the last', () => {
    const { container } = render(() => (
      <Carousel items={items} label="Example carousel" />
    ));
    const scrollIntoView = vi.mocked(Element.prototype.scrollIntoView);
    const lis = () => [...container.querySelectorAll('li')];

    for (let i = 0; i < items.length; i += 1) {
      vi.advanceTimersByTime(3_000);
    }
    expect(scrollIntoView.mock.instances.at(-1)).toBe(lis()[0]);
  });

  it('resets the pending timer on a manual interaction; no advance occurs until 3 more seconds of inactivity', () => {
    const { container } = render(() => (
      <Carousel items={items} label="Example carousel" />
    ));
    const ul = container.querySelector('ul');
    if (!ul) throw new Error('ul not found');
    const scrollIntoView = vi.mocked(Element.prototype.scrollIntoView);
    const lis = () => [...container.querySelectorAll('li')];
    const callsBefore = scrollIntoView.mock.calls.length;

    vi.advanceTimersByTime(2_000);
    fire(ul, 'scroll');
    vi.advanceTimersByTime(2_000);
    expect(scrollIntoView.mock.calls.length).toBe(callsBefore);

    vi.advanceTimersByTime(1_000);
    expect(scrollIntoView.mock.instances.at(-1)).toBe(lis()[1]);
  });

  it('never starts the timer when prefers-reduced-motion: reduce is requested', () => {
    stubMatchMedia(true);
    render(() => <Carousel items={items} label="Example carousel" />);
    expect(vi.getTimerCount()).toBe(0);

    const scrollIntoView = vi.mocked(Element.prototype.scrollIntoView);
    const callsAfterMount = scrollIntoView.mock.calls.length;
    vi.advanceTimersByTime(60_000);
    expect(scrollIntoView.mock.calls.length).toBe(callsAfterMount);
  });

  it('does not advance while the tab is hidden, and resumes once it is visible again', () => {
    const { container } = render(() => (
      <Carousel items={items} label="Example carousel" />
    ));
    const scrollIntoView = vi.mocked(Element.prototype.scrollIntoView);
    const lis = () => [...container.querySelectorAll('li')];
    const callsBefore = scrollIntoView.mock.calls.length;

    Object.defineProperty(document, 'visibilityState', {
      configurable: true,
      get: () => 'hidden',
    });
    fire(document, 'visibilitychange');
    vi.advanceTimersByTime(10_000);
    expect(scrollIntoView.mock.calls.length).toBe(callsBefore);

    Object.defineProperty(document, 'visibilityState', {
      configurable: true,
      get: () => 'visible',
    });
    fire(document, 'visibilitychange');
    vi.advanceTimersByTime(3_000);
    expect(scrollIntoView.mock.instances.at(-1)).toBe(lis()[1]);
  });

  it('pauses while hovered, and resumes once the pointer leaves', () => {
    const { container } = render(() => (
      <Carousel items={items} label="Example carousel" />
    ));
    const ul = container.querySelector('ul');
    if (!ul) throw new Error('ul not found');
    const scrollIntoView = vi.mocked(Element.prototype.scrollIntoView);
    const lis = () => [...container.querySelectorAll('li')];
    const callsBefore = scrollIntoView.mock.calls.length;

    fire(ul, 'mouseenter');
    vi.advanceTimersByTime(10_000);
    expect(scrollIntoView.mock.calls.length).toBe(callsBefore);

    fire(ul, 'mouseleave');
    vi.advanceTimersByTime(3_000);
    expect(scrollIntoView.mock.instances.at(-1)).toBe(lis()[1]);
  });

  it('pauses while keyboard focus is inside it, and resumes once focus leaves', () => {
    const { container } = render(() => (
      <Carousel items={items} label="Example carousel" />
    ));
    const ul = container.querySelector('ul');
    if (!ul) throw new Error('ul not found');
    const scrollIntoView = vi.mocked(Element.prototype.scrollIntoView);
    const lis = () => [...container.querySelectorAll('li')];
    const callsBefore = scrollIntoView.mock.calls.length;

    fire(ul, 'focusin');
    vi.advanceTimersByTime(10_000);
    expect(scrollIntoView.mock.calls.length).toBe(callsBefore);

    fire(ul, 'focusout');
    vi.advanceTimersByTime(3_000);
    expect(scrollIntoView.mock.instances.at(-1)).toBe(lis()[1]);
  });

  it('resumes autoplay from the actual scroll position rather than a stale remembered index', () => {
    const { container } = render(() => (
      <Carousel items={items} label="Example carousel" />
    ));
    const ul = container.querySelector('ul');
    if (!ul) throw new Error('ul not found');
    const scrollIntoView = vi.mocked(Element.prototype.scrollIntoView);
    const lis = () => [...container.querySelectorAll('li')];

    // Simulate the visitor manually scrolling straight to item 2
    // (skipping the internal activeIndex signal, still at 0) and
    // resting there past the interval.
    stubLayout(container, 2);
    fire(ul, 'scroll');
    vi.advanceTimersByTime(3_000);

    expect(scrollIntoView.mock.instances.at(-1)).toBe(lis()[3]);
  });
});
