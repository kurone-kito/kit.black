import { Navbar } from 'bloomer';
import React from 'react';

import NavBrand from '~/atoms/NavBrand';
import NavMenu from '~/molecules/NavMenu';

const component: React.FC = () => (
  <Navbar>
    <NavBrand />
    <NavMenu />
  </Navbar>
);

component.displayName = 'Nav';

export default component;
