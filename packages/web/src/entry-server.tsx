// @refresh reload
import { createHandler, StartServer } from '@solidjs/start/server';
import { getRequestEvent } from 'solid-js/web';

/** The fallback document language, matching the app's i18n fallback. */
const FALLBACK_LANGUAGE = 'ja';

/** Matches a leading `en`/`ja` locale path segment. */
const localeSegment = /^\/?(en|ja)(?:\/|$)/;

/**
 * Resolves the document language from the current request path.
 *
 * The document shell renders outside the router, so `useLanguage()`
 * isn't reachable here. `getRequestEvent()` is populated by the same
 * synchronous SSR pass `StartServer` itself reads it in, so it is safe
 * to read again here.
 * @returns The resolved language code.
 */
const resolveLanguage = () => {
  const event = getRequestEvent();
  const pathname = event ? new URL(event.request.url).pathname : '';
  return localeSegment.exec(pathname)?.[1] ?? FALLBACK_LANGUAGE;
};

/** The server handler. */
export default createHandler(() => (
  <StartServer
    document={({ assets, children, scripts }) => (
      <html lang={resolveLanguage()}>
        <head prefix="og: http://ogp.me/ns#">
          <meta charset="utf-8" />
          {assets}
        </head>
        <body>
          <div id="app">{children}</div>
          {scripts}
        </body>
      </html>
    )}
  />
));
