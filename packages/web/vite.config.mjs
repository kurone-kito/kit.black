import md from 'markdown-it';
import linkAttributes from 'markdown-it-link-attributes';
import { defineConfig } from 'vite';
import { plugin as mdPlugin, Mode } from 'vite-plugin-markdown';

/**
 * The matcher function for the markdown-it-link-attributes plugin.
 * @param {string} href The href attribute of the link.
 * @returns {boolean} Whether the link is an external link.
 */
const matcher = (href) => /^https?:/.test(href);

/** The Markdown parser. */
const markdownIt = md({ html: true }).use(linkAttributes, {
  attrs: { target: '_blank', rel: 'noopener noreferrer' },
  matcher,
});

export default defineConfig({
  plugins: [mdPlugin({ markdownIt, mode: [Mode.HTML] })],
});
