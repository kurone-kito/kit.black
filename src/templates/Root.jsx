import React from 'react';

/**
 * Type of properties.
 * @typedef IProps
 * @property {React.FC} Body
 * @property {React.ReactChildren} children
 * @property {React.FC} Head
 * @property {React.FC} Html
 */

/** @type {React.FC<IProps>} */
const component =
  ({ Body, children, Head }) => (
    <html lang="ja">
      <Head>
        <meta charSet="UTF-8" />
        <meta httpEquiv="x-ua-compatible" content="ie=Edge" />
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1, maximum-scale=5, shrink-to-fit=no, viewport-fit=cover"
        />
      </Head>
      <Body>{children}</Body>
    </html>
  );

component.displayName = 'Root';

export default component;
