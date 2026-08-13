import { Router } from '@solidjs/router';
import { FileRoutes } from '@solidjs/start/router';
import { withSentryRouterRouting } from '@sentry/solidstart/solidrouter';
import type { Component } from 'solid-js';
import './app.css';
import { RootTemplate } from './components/template/RootTemplate.js';

/**
 * The Sentry-instrumented router, so client-side navigations produce
 * traced spans. Safely no-ops until `initSentry` has run.
 */
const SentryRouter = withSentryRouterRouting(Router);

/**
 * The main application component.
 * @returns The component.
 */
const App: Component = () => (
  <SentryRouter base={import.meta.env.SERVER_BASE_URL} root={RootTemplate}>
    <FileRoutes />
  </SentryRouter>
);

export default App;
