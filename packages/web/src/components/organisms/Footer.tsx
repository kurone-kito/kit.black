import type { Component } from 'solid-js';
import { FaBrandsGithub } from 'solid-icons/fa';
import { SiNetlify } from 'solid-icons/si';
import constants from '../../constants.json';
import { now } from '../../modules/datetime.js';
import { FooterItem } from '../molecules/FooterItem.js';

/**
 * The footer component.
 * @returns The component.
 */
export const Footer: Component = () => (
  <footer class="footer footer-center bg-base-300 text-base-content px-safe pb-safe-or-6 pt-6 font-extralight">
    <aside class="flex font-thin tracking-wide" translate="no">
      <p>
        &copy; 2018-{now().getFullYear()} {constants.author.name}
      </p>
      <ul class="menu menu-horizontal">
        <FooterItem
          href="https://github.com/kurone-kito/kit.black"
          tip="Repository"
        >
          <FaBrandsGithub class="inline" />
        </FooterItem>
        <FooterItem href="https://www.netlify.com" tip="Powered by Netlify">
          <SiNetlify class="inline" />
        </FooterItem>
      </ul>
    </aside>
  </footer>
);
