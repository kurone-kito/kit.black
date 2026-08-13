// @refresh reload
import { mount, StartClient } from '@solidjs/start/client';
import { initSentry } from './modules/initSentry.js';

initSentry({ dsn: import.meta.env['VITE_SENTRY_DSN'] });

/** The client handler. */
export default mount(() => <StartClient />, document.getElementById('app')!);
