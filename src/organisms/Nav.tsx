import { Navbar } from 'bloomer';
import { inject, observer } from 'mobx-react';
import React from 'react';
import OutsideClickHandler from 'react-outside-click-handler';

import NavBrand from '~/atoms/NavBrand';
import NavMenu from '~/molecules/NavMenu';
import NavStore from '~/stores/nav';

/** Type of properties. */
interface IProps {
  /** Store for navigation menu. */
  navStore: NavStore;
}

@inject(({ navStore }): IProps => ({ navStore }))
@observer
export default class Nav extends React.Component<IProps> {
  public render() {
    return (
      <OutsideClickHandler onOutsideClick={this.onOutsideClick}>
        <Navbar>
          <NavBrand />
          <NavMenu />
        </Navbar>
      </OutsideClickHandler>
    );
  }

  /** Called on tapping outside of component. */
  private onOutsideClick = () => {
    const { navStore: { expanded, toggleExpantion } } = this.props;

    if (expanded) {
      toggleExpantion();
    }
  }
}
