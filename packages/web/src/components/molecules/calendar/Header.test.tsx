import { cleanup, render } from '@solidjs/testing-library';
import { afterEach, describe, expect, it } from 'vitest';
import { Header } from './Header.js';

afterEach(() => cleanup());

describe('calendar Header molecule', () => {
  it('renders the date-span text as the section h3, with no other headings', () => {
    const { container } = render(() => <Header dateSpan="10/21〜10/27" />);
    const headings = container.querySelectorAll('h1, h2, h3, h4, h5, h6');
    expect(headings).toHaveLength(1);
    expect(headings[0]?.tagName).toBe('H3');
    expect(headings[0]?.textContent).toContain('10/21〜10/27');
  });

  it('does not render the decorative calendar logo as a heading element', () => {
    const { container } = render(() => <Header dateSpan="10/21〜10/27" />);
    const wordmark = container.querySelectorAll('p');
    const wordmarkTexts = Array.from(wordmark).map((el) => el.textContent);
    expect(wordmarkTexts.some((text) => text?.includes('Kuroné'))).toBe(true);
  });
});
