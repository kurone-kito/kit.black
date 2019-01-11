import DevTools from 'mobx-react-devtools';
import React from 'react';

const component: React.FC = () => process.env.REACT_STATIC_ENV === 'development' && <DevTools />;

component.displayName = 'DevTools';

export default component;
