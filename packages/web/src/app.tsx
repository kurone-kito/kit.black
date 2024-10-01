import { Router } from '@solidjs/router';
import { FileRoutes } from '@solidjs/start/router';
import type { Component } from 'solid-js';
import './app.css';
import { RootTemplate } from './components/template/RootTemplate.js';

/**
 * The main application component.
 * @returns The component.
 */
const App: Component = () => (
  <Router base={import.meta.env.SERVER_BASE_URL} root={RootTemplate}>
    <FileRoutes />
  </Router>
);

export default App;
