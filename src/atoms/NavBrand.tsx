import { NavbarBrand, NavbarBurger } from 'bloomer';
import { inject, observer } from 'mobx-react';
import React from 'react';

import NavStore from '~/stores/nav';

interface IProps {
  navStore: NavStore;
}

const component: React.FC<Partial<IProps>> = ({ navStore: { expand, toggleExpantion } }) => (
  <NavbarBrand>
    <NavbarBurger isActive={expand} onClick={toggleExpantion} />
  </NavbarBrand>
);

component.displayName = 'NavBrand';

export default inject(({ navStore }): IProps => ({ navStore }))(observer(component));
