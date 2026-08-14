import { MemoryRouter, Route } from '@solidjs/router';
import { cleanup, fireEvent, render, waitFor } from '@solidjs/testing-library';
import { afterEach, describe, expect, it, vi } from 'vitest';
import rows from '../../data.json';
import { dateRangeOf } from '../../modules/dateRange.js';
import type { RowProps } from '../atoms/calendar/Row.js';
import { Calendar } from './Calendar.js';

// `vi.mock` factories may only reference hoisted bindings, so the mock
// function is created via `vi.hoisted` rather than a plain top-level
// `const` -- see https://vitest.dev/api/vi.html#vi-hoisted.
const { toBlob } = vi.hoisted(() => ({
  toBlob: vi.fn(async () => new Blob(['snapshot'], { type: 'image/webp' })),
}));

vi.mock('@zumer/snapdom', () => ({ snapdom: { toBlob } }));

const createObjectURL = vi.fn(() => 'blob:mock-url');
const revokeObjectURL = vi.fn();

// jsdom implements neither `URL.createObjectURL` nor
// `URL.revokeObjectURL`; save the (absent) originals so `afterEach` can
// restore them -- not just clear the mocks -- even if an assertion
// throws mid-test.
const originalCreateObjectURL = URL.createObjectURL;
const originalRevokeObjectURL = URL.revokeObjectURL;

let clickSpy: ReturnType<typeof vi.spyOn> | undefined;
let consoleErrorSpy: ReturnType<typeof vi.spyOn> | undefined;

afterEach(() => {
  cleanup();
  toBlob.mockClear();
  createObjectURL.mockClear();
  revokeObjectURL.mockClear();
  URL.createObjectURL = originalCreateObjectURL;
  URL.revokeObjectURL = originalRevokeObjectURL;
  clickSpy?.mockRestore();
  clickSpy = undefined;
  consoleErrorSpy?.mockRestore();
  consoleErrorSpy = undefined;
});

describe('Calendar organism', () => {
  it('renders the date span derived from data.json rows, not the wall clock', () => {
    const [since, until] = dateRangeOf(rows as readonly RowProps[]);

    const { getByText } = render(() => (
      <MemoryRouter>
        <Route path="/:language?" component={Calendar} />
      </MemoryRouter>
    ));

    expect(getByText(`${since}〜${until}`)).toBeInTheDocument();
  });

  it('captures the calendar element and downloads it with the computed filename', async () => {
    URL.createObjectURL = createObjectURL;
    URL.revokeObjectURL = revokeObjectURL;
    const clickedAnchors: HTMLAnchorElement[] = [];
    clickSpy = vi
      .spyOn(HTMLAnchorElement.prototype, 'click')
      .mockImplementation(function (this: HTMLAnchorElement) {
        clickedAnchors.push(this);
      });

    const { getByRole } = render(() => (
      <MemoryRouter>
        <Route path="/:language?" component={Calendar} />
      </MemoryRouter>
    ));

    fireEvent.click(getByRole('button'));

    await waitFor(() => expect(clickedAnchors).toHaveLength(1));

    expect(toBlob).toHaveBeenCalledOnce();
    const [element, options] = toBlob.mock.calls[0] as [
      HTMLElement,
      Record<string, unknown>,
    ];
    expect(element).toHaveAttribute('id', 'calendar');
    expect(options).toMatchObject({
      embedFonts: true,
      scale: 2,
      type: 'webp',
    });

    expect(createObjectURL).toHaveBeenCalledOnce();
    expect(clickedAnchors[0]?.href).toBe('blob:mock-url');
    expect(clickedAnchors[0]?.download).toMatch(/^schedule-.+\.webp$/);
    expect(revokeObjectURL).toHaveBeenCalledWith('blob:mock-url');
  });

  it('logs and does not throw when the capture fails', async () => {
    URL.createObjectURL = createObjectURL;
    URL.revokeObjectURL = revokeObjectURL;
    toBlob.mockRejectedValueOnce(new Error('capture failed'));
    consoleErrorSpy = vi.spyOn(console, 'error').mockImplementation(() => {});

    const { getByRole } = render(() => (
      <MemoryRouter>
        <Route path="/:language?" component={Calendar} />
      </MemoryRouter>
    ));

    fireEvent.click(getByRole('button'));

    await waitFor(() => expect(consoleErrorSpy).toHaveBeenCalledOnce());

    expect(consoleErrorSpy).toHaveBeenCalledWith(
      'Failed to download the calendar image.',
      expect.any(Error),
    );
    expect(createObjectURL).not.toHaveBeenCalled();
    expect(revokeObjectURL).not.toHaveBeenCalled();
  });

  it('still revokes the object URL and removes the anchor when a failure happens after it is created', async () => {
    URL.createObjectURL = createObjectURL;
    URL.revokeObjectURL = revokeObjectURL;
    let clickedAnchor: HTMLAnchorElement | undefined;
    clickSpy = vi
      .spyOn(HTMLAnchorElement.prototype, 'click')
      .mockImplementation(function (this: HTMLAnchorElement) {
        clickedAnchor = this;
        throw new Error('click failed');
      });
    consoleErrorSpy = vi.spyOn(console, 'error').mockImplementation(() => {});

    const { getByRole } = render(() => (
      <MemoryRouter>
        <Route path="/:language?" component={Calendar} />
      </MemoryRouter>
    ));

    fireEvent.click(getByRole('button'));

    await waitFor(() => expect(consoleErrorSpy).toHaveBeenCalledOnce());

    expect(createObjectURL).toHaveBeenCalledOnce();
    expect(revokeObjectURL).toHaveBeenCalledWith('blob:mock-url');
    expect(clickedAnchor).toBeDefined();
    expect(document.body.contains(clickedAnchor ?? null)).toBe(false);
  });
});
