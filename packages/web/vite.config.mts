import tailwindcss from '@tailwindcss/vite';
import md from 'markdown-it';
import linkAttributes from 'markdown-it-link-attributes';
import { defineConfig } from 'vite';
import { Mode, plugin as mdPlugin } from 'vite-plugin-markdown';

/**
 * The matcher function for the markdown-it-link-attributes plugin.
 * @param href The href attribute of the link.
 * @returns Whether the link is an external link.
 */
const matcher = (href: string) => /^https?:/.test(href);

/** The Markdown parser. */
const markdownIt = md({ html: true }).use(linkAttributes, {
  attrs: { target: '_blank', rel: 'noopener noreferrer' },
  matcher,
});

export default defineConfig({
  plugins: [
    mdPlugin({ markdownIt, mode: [Mode.HTML] }),
    // biome-ignore lint/complexity/noBannedTypes: <explanation>
    (tailwindcss as Function)(),
  ],
});
