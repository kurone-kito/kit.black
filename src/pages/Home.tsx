import React from 'react';
import { withSiteData } from 'react-static';

import imgKito from '~/images/kito.png';
import imgMarshmallow from '~/images/marshmallow.svg';

const component: React.FC = () => (
  <div>
    <nav>
      <ul>
        <li>
          <a href="https://github.com/kurone-kito" target="_blank">
            <span className="icon">
              <i className="fab fa-github fa-3x" />
            </span>
          </a>
        </li>
        <li>
          <a href="https://twitter.com/kurone_kito" target="_blank">
            <span className="icon">
              <i className="fab fa-twitter fa-3x" />
            </span>
          </a>
        </li>
        <li>
          <a href="https://www.youtube.com/channel/UCJs_ejHQM0rcemJaeO2s5vA" target="_blank">
            <span className="icon">
              <i className="fab fa-youtube fa-3x" />
            </span>
          </a>
        </li>
        <li>
          <a href="https://marshmallow-qa.com/kurone_kito" target="_blank">
            <img alt="" src={imgMarshmallow} />
          </a>
        </li>
      </ul>
    </nav>
    <header>
      <h1 className="title is-1 kit-logo">KURONEKITO</h1>
      <h2 className="subtitle">VTuber &amp; Web Programmer</h2>
      <img alt="" src={imgKito} />
    </header>
  </div>
);

component.displayName = 'Home';

export default withSiteData(component);
