import React from 'react';
import ReactDOM from 'react-dom';

// Your top level component
import App from './App';

// Export your top level component as JSX (for static rendering)
export default App;

// Render your app
if (typeof document !== 'undefined') {
  (module.hot ? ReactDOM.render : ReactDOM.hydrate || ReactDOM.render)(
    <App />, document.getElementById('root'));
}
