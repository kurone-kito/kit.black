import { MemoryRouter, Route } from '@solidjs/router';
import { cleanup, fireEvent, render, waitFor } from '@solidjs/testing-library';
import { afterEach, describe, expect, it, vi } from 'vitest';
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

afterEach(() => {
  cleanup();
  toBlob.mockClear();
  createObjectURL.mockClear();
  revokeObjectURL.mockClear();
});

describe('Calendar organism', () => {
  it('captures the calendar element and downloads it with the computed filename', async () => {
    URL.createObjectURL = createObjectURL;
    URL.revokeObjectURL = revokeObjectURL;
    const clickedAnchors: HTMLAnchorElement[] = [];
    const clickSpy = vi
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

    clickSpy.mockRestore();
  });
});
