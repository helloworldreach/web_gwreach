/*
import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';

ReactDOM.render(<App />, document.getElementById('root'));
registerServiceWorker();
*/
import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { Route } from 'react-router-dom';
import {ConnectedRouter as Router} from 'react-router-redux';
import store, { history } from './store';
import App from './containers/App';
import Home from './containers/Home';
import Room from './containers/Room';

import './index.css'
import 'typeface-roboto';

const target = document.querySelector('#root');

render(
    <Provider store={store}>
        <Router history={history}>
            <div className="app-wrapper">
                <App>
                    <Route exact path="/" component={Home} />
                    <Route path="/room" component={Room} />
                </App>
            </div>
        </Router>
    </Provider>,
    target
);