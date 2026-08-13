import { cleanup, render } from '@solidjs/testing-library';
import type { Component } from 'solid-js';
import { afterEach, describe, expect, it } from 'vitest';
import type { AnchorAttrsRequired } from './Anchor.js';
import { Anchor } from './Anchor.js';

/** A stub component standing in for the default `'a'` element. */
const Stub: Component<AnchorAttrsRequired> = (props) => (
  <button {...props} type="button" />
);

afterEach(() => cleanup());

describe('Anchor', () => {
  it('opens an external https URL in a new tab', () => {
    const { container } = render(() => (
      <Anchor href="https://example.test/">External</Anchor>
    ));
    const anchor = container.querySelector('a');
    expect(anchor).toHaveAttribute('target', '_blank');
    expect(anchor).toHaveAttribute('rel', 'noopener noreferrer');
  });

  it('does not add target or rel to a relative href', () => {
    const { container } = render(() => <Anchor href="/foo">Internal</Anchor>);
    const anchor = container.querySelector('a');
    expect(anchor).not.toHaveAttribute('target');
    expect(anchor).not.toHaveAttribute('rel');
  });

  it('renders the component given via the as prop instead of a', () => {
    const { container } = render(() => (
      <Anchor as={Stub} href="/foo">
        Internal
      </Anchor>
    ));
    expect(container.querySelector('a')).toBeNull();
    expect(container.querySelector('button')).not.toBeNull();
  });
});
