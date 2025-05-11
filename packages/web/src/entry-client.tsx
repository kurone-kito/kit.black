// @refresh reload
import { StartClient, mount } from '@solidjs/start/client';

/** The client handler. */
// biome-ignore lint/style/noNonNullAssertion: <explanation>
export default mount(() => <StartClient />, document.getElementById('app')!);
