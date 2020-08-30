import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import Router from './routes';
import registerServiceWorker from './registerServiceWorker';

ReactDOM.render(<Router />, document.getElementById('root'));
registerServiceWorker();
