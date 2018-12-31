import React from 'react';
import { hot } from 'react-hot-loader';
import { Head, Router } from 'react-static';
import Routes from 'react-static-routes';

import Favicons from '~/atoms/Favicons';

import './app.scss';

const app: (() => React.ReactElement<{}>) = (): React.ReactElement<{}> => (
  <Router>
    <div>
      <Head>
        <title>kurone-kito</title>
        <meta http-equiv="x-ua-compatible" content="ie=Edge" />
        <meta name="author" content="kurone-kito" />
        <meta name="description" content="Kurone Kito's official site." />
        <meta name="keywords" content="Kito Kurone,黒音キト,VTuber" />
        <link
          crossOrigin="anonymous"
          href="https://fonts.googleapis.com/css?family=Lato:300,400,700,900"
          rel="stylesheet"
        />
        <link
          crossOrigin="anonymous"
          rel="stylesheet"
          href="https://use.fontawesome.com/releases/v5.6.3/css/all.css"
          integrity="sha384-UHRtZLI+pbxtHCWp1t77Bi1L4ZtiqrqD80Kn4Z8NTSRyMA2Fd33n5dQ8lWUE00s/"
        />
      </Head>
      <Favicons />
      <div className="content">
        <Routes />
      </div>
    </div>
  </Router>
);

export default hot(module)(app);
