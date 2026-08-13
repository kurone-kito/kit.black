import { cleanup, fireEvent, render } from '@solidjs/testing-library';
import { afterEach, describe, expect, it, vi } from 'vitest';
import { DownloadCalendarButton } from './DownloadCalendarButton.js';

afterEach(() => cleanup());

describe('DownloadCalendarButton', () => {
  it('renders an accessible, labeled button', () => {
    const { getByRole } = render(() => (
      <DownloadCalendarButton label="Save the schedule calendar as an image" />
    ));
    const button = getByRole('button', {
      name: 'Save the schedule calendar as an image',
    });
    expect(button).toBeInTheDocument();
  });

  it('forwards the click handler', () => {
    const onClick = vi.fn();
    const { getByRole } = render(() => (
      <DownloadCalendarButton label="Download" onClick={onClick} />
    ));
    fireEvent.click(getByRole('button', { name: 'Download' }));
    expect(onClick).toHaveBeenCalledOnce();
  });
});
