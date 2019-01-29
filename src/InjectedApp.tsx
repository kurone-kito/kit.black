import { inject, observer } from 'mobx-react';
import React from 'react';
import EventListener from 'react-event-listener';
import Routes from 'react-static-routes';

import DevTools from '~/atoms/DevTools';
import Favicons from '~/atoms/Favicons';
import Head from '~/atoms/Head';
import ViewStore from '~/stores/view';

import '~/styles/index.scss';

/** Type of properties. */
interface IProps {
  /** Storing state for view environment. */
  viewStore: ViewStore;
}

@inject(({ viewStore }): IProps => ({ viewStore }))
@observer
export default class InjectedApp extends React.Component<Partial<IProps>> {

  public render() {
    return (
      <React.Fragment>
        <Head />
        <EventListener target="window" onResize={this.onResize} />
        <Favicons />
        <Routes />
        <DevTools />
      </React.Fragment>
    );
  }
  private onResize = () => {
    const { viewStore } = this.props;
    viewStore.updateCurrentType();
  }
}
