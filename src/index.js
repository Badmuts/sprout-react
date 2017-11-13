import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router } from 'react-router-dom';
import routes from './routes';
import registerServiceWorker from './registerServiceWorker';

ReactDOM.render(<Router children={routes} />, document.getElementById('root'));
registerServiceWorker();
