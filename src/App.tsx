import { Provider } from 'mobx-react';
import React from 'react';
import { hot } from 'react-hot-loader';
import { Router } from 'react-static';

import stores from '~/stores';

import InjectedApp from './InjectedApp';

import '~/styles/index.scss';

const component: React.FC = () => (
  <Router>
    <React.Fragment>
      <Provider {...stores}>
        <InjectedApp />
      </Provider>
    </React.Fragment>
  </Router>
);

component.displayName = 'App';

export default hot(module)(component);
