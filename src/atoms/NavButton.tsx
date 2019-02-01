import { Button, Icon } from 'bloomer';
import React from 'react';

/** Type of properties. */
interface IProps {
  /** Icon ID for Font Awesome. */
  icon?: string;
  /** Description. */
  tip?: string;
  /** Target URL. */
  url: string;
}

const component: React.FC<IProps> =
  ({ children, tip, icon, url }) => (
    <Button
      href={url}
      isColor="dark"
      rel="noopener"
      target="_blank"
      title={tip}
    >
      {icon && <Icon isSize="medium" className={`${icon} fa-2x`} />}
      {children}
    </Button>
  );

component.displayName = 'NavButton';

export default component;
