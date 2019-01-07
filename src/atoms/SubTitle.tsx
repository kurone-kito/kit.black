import { Subtitle } from 'bloomer';
import { Bulma } from 'bloomer/lib/bulma';
import React from 'react';

/** Type of properties. */
interface IProps {
  /** Additional CSS classes. */
  className?: string;
  /** Element of root tag. */
  root?: keyof React.ReactHTML;
  /** Heading size. */
  size?: Bulma.HeadingSizes;
}

const component: React.FC<IProps> =
  ({ className, root, size }: IProps): React.ReactElement<IProps> => (
    <Subtitle className={className} hasTextAlign="centered" isSize={size} tag={root}>
      “黒音キト”はIT系ブラック企業で働く、Webプログラマーな
    <ruby>
        VTuber
      <rp>(</rp>
        <rt>バーチャルYouTuber</rt>
        <rp>)</rp>
      </ruby>
      です。
  </Subtitle>
  );

component.displayName = 'SubTitle';

component.defaultProps = { className: '', root: 'h3', size: 5 };

export default component;
