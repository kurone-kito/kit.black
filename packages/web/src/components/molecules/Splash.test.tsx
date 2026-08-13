import { cleanup, render } from '@solidjs/testing-library';
import { afterEach, describe, expect, it } from 'vitest';
import { Splash } from './Splash.js';

afterEach(() => cleanup());

describe('Splash molecule', () => {
  it('renders the splash-overlay class that owns visibility and timing in CSS', () => {
    const { container } = render(() => <Splash label="Loading" />);
    const section = container.querySelector('section');
    expect(section).toHaveClass('splash-overlay');
  });

  it('announces itself as a status region with the given label', () => {
    const { container } = render(() => <Splash label="Loading the website" />);
    const section = container.querySelector('section');
    expect(section).toHaveAttribute('role', 'status');
    expect(section).toHaveAttribute('aria-label', 'Loading the website');
  });

  it('pauses the logo animation until the animation prop is enabled', () => {
    const { container } = render(() => <Splash label="Loading" />);
    const logo = container.querySelector(
      '.animate-\\[splash-logo-scale_1\\.5s_ease-in_1\\.5s\\]',
    );
    expect(logo).toHaveClass('[animation-play-state:paused]');
    expect(logo).not.toHaveClass('[animation-play-state:running]');
  });

  it('runs the logo animation once the animation prop is enabled', () => {
    const { container } = render(() => <Splash animation label="Loading" />);
    const logo = container.querySelector(
      '.animate-\\[splash-logo-scale_1\\.5s_ease-in_1\\.5s\\]',
    );
    expect(logo).toHaveClass('[animation-play-state:running]');
    expect(logo).not.toHaveClass('[animation-play-state:paused]');
  });
});
