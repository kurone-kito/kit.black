import { cleanup, render } from '@solidjs/testing-library';
import { afterEach, describe, expect, it } from 'vitest';
import { Row } from './Row.js';

afterEach(() => cleanup());

/**
 * Render a {@link Row} and return its date cell.
 * @param props The properties to pass to {@link Row}.
 * @returns The date cell element.
 */
const renderDateCell = (props: Parameters<typeof Row>[0]): HTMLElement => {
  const { container } = render(() => <Row {...props} />);
  const cell = container.querySelector('.date');
  // Fail with a clear "no .date cell rendered" error here, rather than
  // a less-informative matcher error at the call site if the component
  // ever stops rendering a date cell for the given props.
  expect(cell).not.toBeNull();
  return cell as HTMLElement;
};

describe('Row', () => {
  it('renders the holiday class, not the week class, on a holiday date cell', () => {
    const cell = renderDateCell({ date: '01/01', holiday: true, week: 'thu' });
    expect(cell).toHaveClass('holiday');
    expect(cell).not.toHaveClass('thu');
  });

  it('renders the holiday class, not sat, on a holiday Saturday', () => {
    const cell = renderDateCell({ date: '01/01', holiday: true, week: 'sat' });
    expect(cell).toHaveClass('holiday');
    expect(cell).not.toHaveClass('sat');
  });

  it('still renders the sun class for a non-holiday Sunday', () => {
    const cell = renderDateCell({ date: '01/04', week: 'sun' });
    expect(cell).toHaveClass('sun');
    expect(cell).not.toHaveClass('holiday');
  });

  it('still renders the sat class for a non-holiday Saturday', () => {
    const cell = renderDateCell({ date: '01/03', week: 'sat' });
    expect(cell).toHaveClass('sat');
    expect(cell).not.toHaveClass('holiday');
  });
});
