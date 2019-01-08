import React from 'react';

import Marshmallow from '~/atoms/Marshmallow';

const component: React.FC = () => (
  <nav style={{ display: 'none' }}>
    <ul>
      <li>
        <a href="https://github.com/kurone-kito" target="_blank" title="GitHubでフォローしてください">
          <span className="icon">
            <i className="fab fa-github fa-3x" />
          </span>
        </a>
      </li>
      <li>
        <a href="https://twitter.com/kurone_kito" target="_blank" title="Twitterでフォローしてください">
          <span className="icon">
            <i className="fab fa-twitter fa-3x" />
          </span>
        </a>
      </li>
      <li>
        <a
          href="https://www.youtube.com/channel/UCJs_ejHQM0rcemJaeO2s5vA"
          target="_blank"
          title="YouTubeチャンネルに登録してください"
        >
          <span className="icon">
            <i className="fab fa-youtube fa-3x" />
          </span>
        </a>
      </li>
      <li>
        <a href="https://marshmallow-qa.com/kurone_kito" target="_blank" title="マシュマロで匿名の質問をください">
          <Marshmallow />
        </a>
      </li>
    </ul>
  </nav>
);

component.displayName = 'Nav';

export default component;
