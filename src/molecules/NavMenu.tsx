import { Button, NavbarEnd, NavbarItem, NavbarMenu } from 'bloomer';
import { inject, observer } from 'mobx-react';
import React from 'react';

import Marshmallow from '~/atoms/Marshmallow';

import NavStore from '~/stores/nav';

interface IProps {
  navStore: NavStore;
}

const component: React.FC<Partial<IProps>> = () => (
  <NavbarMenu id="navbarMenu" >
    <NavbarEnd>
      <NavbarItem>
        <div className="buttons">
          <Button>GitHub</Button>
        </div>
      </NavbarItem>
    </NavbarEnd>
    <ul style={{ display: 'none' }}>
      <li>
        <a
          href="https://github.com/kurone-kito"
          rel="noopener"
          target="_blank"
          title="GitHubでフォローしてください"
        >
          <span className="icon">
            <i className="fab fa-github fa-3x" />
          </span>
        </a>
      </li>
      <li>
        <a
          href="https://twitter.com/kurone_kito"
          rel="noopener"
          target="_blank"
          title="Twitterでフォローしてください"
        >
          <span className="icon">
            <i className="fab fa-twitter fa-3x" />
          </span>
        </a>
      </li>
      <li>
        <a
          href="https://www.youtube.com/channel/UCJs_ejHQM0rcemJaeO2s5vA"
          rel="noopener"
          target="_blank"
          title="YouTubeチャンネルに登録してください"
        >
          <span className="icon">
            <i className="fab fa-youtube fa-3x" />
          </span>
        </a>
      </li>
      <li>
        <a
          href="https://marshmallow-qa.com/kurone_kito"
          rel="noopener"
          target="_blank"
          title="マシュマロで匿名の質問をください"
        >
          <Marshmallow />
        </a>
      </li>
    </ul>
  </NavbarMenu>
);

component.displayName = 'NavMenu';

export default inject(({ navStore }): IProps => ({ navStore }))(observer(component));
