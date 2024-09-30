import { render, screen } from '@solidjs/testing-library';
import { expect, it } from 'vitest';

it.skip('should render the Hello world component', () => {
  render(() => <div>Hello, world!</div>);
  expect(screen.getByText('Hello, world!')).toBeInTheDocument();
});
