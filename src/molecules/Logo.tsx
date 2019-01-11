import { Hero, HeroBody, Subtitle, Title } from 'bloomer';
import { inject, observer } from 'mobx-react';
import React from 'react';

import SubTitle from '~/atoms/SubTitle';
import imgKito from '~/images/kito.png';
import ViewStore from '~/stores/view';
import { ViewportType } from '~/utils/state';

interface IProps {
  viewStore: ViewStore;
}

const component: React.FC<Partial<IProps>> = ({ viewStore: { viewportType } }) => (
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
      {viewportType === ViewportType.tablet && <SubTitle />}
    </HeroBody>
  </Hero>
);

component.displayName = 'Logo';

export default inject(({ viewStore }): IProps => ({ viewStore }))(observer(component));
