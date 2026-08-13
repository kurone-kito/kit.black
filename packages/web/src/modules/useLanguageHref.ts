import { useLocation } from '@solidjs/router';
import { createMemo } from 'solid-js';
import type { Language } from './createI18N.js';

/**
 * The regular expression for the language.
 *
 * The trailing lookahead asserts a segment boundary without consuming
 * it -- this function's callers use `.replace()` to remove the matched
 * locale segment, so a *consuming* boundary (e.g. `(?:\/|$)`) would eat
 * the following `/` along with it and mangle the remaining path (unlike
 * `entry-server.tsx`'s own copy of this pattern, which only reads a
 * capture group via `.exec()` and never reconstructs a path, so
 * consuming the boundary there is harmless).
 */
const regexp = /^\/?(en|ja)(?=\/|$)/;

/**
 * Strips the request base and any leading locale segment from a
 * pathname.
 * @param pathname The raw route pathname.
 * @returns The path with the locale segment removed.
 */
const stripLanguageSegment = (pathname: string): string =>
  pathname.replace(import.meta.env.SERVER_BASE_URL, '').replace(regexp, '');

/**
 * Uses the href with language from dynamic route.
 * @param target The target language.
 * @returns The language href.
 */
export const useLanguageHref = (target: Language) => {
  const location = useLocation();
  return createMemo(
    () => `/${target}${stripLanguageSegment(location.pathname)}`,
  );
};

/**
 * Uses the current path with any leading locale segment stripped, for
 * locale-independent links such as the `x-default` hreflang alternate.
 * @returns The unprefixed path (`/` when nothing else follows the
 * locale segment).
 */
export const useUnprefixedHref = () => {
  const location = useLocation();
  return createMemo(() => stripLanguageSegment(location.pathname) || '/');
};
