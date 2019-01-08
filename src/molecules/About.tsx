import React from 'react';

import SubTitle from '~/atoms/SubTitle';

const component: React.FC = () => (
  <main className="section">
    <section className="container">
      <SubTitle />
      <p>
        独立系SIer会社に所属してWebフロントエンド開発に携わっています。<wbr />
        現場でのにゃーんなお話、ブラックあるあるなお話をしつつ、ゲーム実況など様々な活動をしています。
      </p>
    </section>
    <hr />
    <section className="container">
      <div className="kit-table">
        <dl>
          <dt>種族</dt>
          <dd>人間 (中身は黒猫🐱)</dd>
        </dl>
        <dl>
          <dt>誕生日</dt>
          <dd>10月9日 成人済です</dd>
        </dl>
        <dl>
          <dt>できること</dt>
          <dd>
            <ul>
              <li>⚛️ Webフロントエンド開発</li>
              <li>💠 ロゴデザイン・UI/UXデザイン</li>
              <li>😿 ブラックSIer勤務あるある話</li>
              <li>😺 にゃーん(中身は黒猫🐱)</li>
            </ul>
          </dd>
        </dl>
      </div>
    </section>
  </main>
);

component.displayName = 'About';

export default component;
