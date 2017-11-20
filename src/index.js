import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router } from 'react-router-dom';
import routes from './routes';
import registerServiceWorker from './registerServiceWorker';
import 'normalize.css';
import 'flexboxgrid';
import '@blueprintjs/core/dist/blueprint.css'

ReactDOM.render(<Router children={routes} />, document.getElementById('root'));
registerServiceWorker();
