import { NavbarBrand, NavbarBurger } from 'bloomer';
import { inject, observer } from 'mobx-react';
import React from 'react';

import NavStore from '~/stores/nav';

/** Type of properties. */
interface IProps {
  /** Store for navigation menu. */
  navStore: NavStore;
}

const component: React.FC<Partial<IProps>> = ({ navStore: { expanded, toggleExpantion } }) => (
  <NavbarBrand>
    <NavbarBurger isActive={expanded} onClick={toggleExpantion} />
  </NavbarBrand>
);
component.displayName = 'NavBrand';

export default inject(({ navStore }): IProps => ({ navStore }))(observer(component));
