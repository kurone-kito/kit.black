import { NavbarEnd, NavbarItem, NavbarMenu } from 'bloomer';
import { inject, observer } from 'mobx-react';
import React from 'react';

import Marshmallow from '~/atoms/Marshmallow';
import NavButton from '~/atoms/NavButton';

import NavStore from '~/stores/nav';

/** Type of properties. */
interface IProps {
  /** Store for navigation menu. */
  navStore: NavStore;
}

const component: React.FC<Partial<IProps>> = ({ navStore: { expanded } }) => (
  <NavbarMenu isActive={expanded}>
    <NavbarEnd>
      <NavbarItem>
        <div className="buttons kit-nav-buttons">
          <NavButton
            url="https://github.com/kurone-kito"
            icon="fab fa-github"
            tip="GitHubでフォローしてください"
          />
          <NavButton
            url="https://twitter.com/kurone_kito"
            icon="fab fa-twitter"
            tip="Twitterでフォローしてください"
          />
          <NavButton
            url="https://www.youtube.com/channel/UCJs_ejHQM0rcemJaeO2s5vA"
            icon="fab fa-youtube"
            tip="YouTubeチャンネルに登録してください"
          />
        </div>
      </NavbarItem>
    </NavbarEnd>
    <ul style={{ display: 'none' }}>
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
