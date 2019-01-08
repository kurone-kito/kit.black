import React from 'react';
import { withSiteData } from 'react-static';

import Logo from '~/atoms/Logo';
import YouTube from '~/atoms/YouTube';
import About from '~/molecules/About';
import Nav from '~/molecules/Nav';

const component: React.FC = () => (
  <React.Fragment>
    <Nav />
    <Logo />
    <About />
    <YouTube id="K1QRWeIDSdk" />
    <footer className="footer">
      <p>©︎2018-2019 Kurone Kito</p>
    </footer>
  </React.Fragment>
);

component.displayName = 'Home';

export default withSiteData(component);
