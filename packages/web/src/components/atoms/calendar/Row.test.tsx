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

  it('renders the rowSpan on the date cell when dateSpan is given', () => {
    const cell = renderDateCell({ date: '01/01', dateSpan: 2, week: 'thu' });
    expect(cell).toHaveAttribute('rowspan', '2');
  });

  it('renders no date cell at all when date is omitted', () => {
    const { container } = render(() => <Row time="10:00">Content</Row>);
    expect(container.querySelector('.date')).toBeNull();
  });

  it('spans two columns when time is omitted', () => {
    const { container } = render(() => <Row date="01/01">Content</Row>);
    const cell = container.querySelector('td:last-child');
    expect(cell).toHaveAttribute('colspan', '2');
    expect(container.querySelectorAll('td.time')).toHaveLength(0);
  });

  it('renders a separate time cell when time is given', () => {
    const { container } = render(() => (
      <Row date="01/01" time="10:00">
        Content
      </Row>
    ));
    expect(container.querySelector('td.time')).not.toBeNull();
    expect(container.querySelectorAll('td[colspan]')).toHaveLength(0);
  });
});
