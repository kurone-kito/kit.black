declare module '*.md' {
  // "unknown" would be more detailed depends on how you structure frontmatter
  const attributes: Readonly<Record<string, string>>;

  // When "Mode.HTML" is requested
  const html: string;

  // Modify below per your usage
  export { attributes, html };
}

// vite-imagetools query imports: `as=srcset` resolves to a browser-ready
// `srcset` attribute value (a comma-separated "url width" list). The
// `as=srcset` directive is always passed last in this project's own
// imagetools queries so the wildcard suffix below matches reliably. The
// existing plain `*.webp` import (see `vite/client`) still covers the
// unmodified fallback `src` import used alongside each `srcset`.
declare module '*&as=srcset' {
  const srcset: string;
  export default srcset;
}
