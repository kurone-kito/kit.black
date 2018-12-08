import React from 'react';
import { hot } from 'react-hot-loader';
import { Link, Router } from 'react-static';
import Routes from 'react-static-routes';

import './app.css';

const app: (() => React.ReactElement<{}>) = (): React.ReactElement<{}> => (
  <Router>
    <div>
      <nav>
        <Link exact={true} to="/">Home</Link>
        <Link to="/about">About</Link>
        <Link to="/blog">Blog</Link>
      </nav>
      <div className="content">
        <Routes />
      </div>
    </div>
  </Router>
);

export default hot(module)(app);
