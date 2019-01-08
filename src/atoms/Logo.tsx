import { Hero, HeroBody, Subtitle, Title } from 'bloomer';
import React from 'react';

import imgKito from '~/images/kito.png';

const component: React.FC = () => (
  <Hero tag="header">
    <HeroBody className="kit-hero">
      <img className="kit-kito" alt="" src={imgKito} />
      <div className="kit-logo">
        <Title>
          <span className="kit-family-name">Kurone</span>
          <span className="kit-first-name">Kito</span>
        </Title>
        <Subtitle>
          <span className="kit-logo-vtuber">VTuber</span>
          &nbsp;&amp;&nbsp;
          <span className="kit-logo-web-programmer">Web Programmer</span>
        </Subtitle>
      </div>
    </HeroBody>
  </Hero>
);

component.displayName = 'Logo';

export default component;
