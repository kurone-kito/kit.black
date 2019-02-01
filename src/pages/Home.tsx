import React from 'react';
import { withSiteData } from 'react-static';

import YouTube from '~/atoms/YouTube';
import About from '~/molecules/About';
import Logo from '~/molecules/Logo';
import Nav from '~/organisms/Nav';

const component: React.FC = () => (
  <React.Fragment>
    <Nav />
    <Logo />
    <About />
    <YouTube id="K1QRWeIDSdk" title="社会性フィルター" />
    <footer className="footer">
      <p>©︎2018-2019 Kurone Kito</p>
    </footer>
  </React.Fragment>
);

component.displayName = 'Home';

export default withSiteData(component);
