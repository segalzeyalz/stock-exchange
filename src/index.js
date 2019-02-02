import React from 'react';
import ReactDOM from 'react-dom';
import { createStore } from 'redux';
import reducer from './reducers/rootReducer';

import './index.css';
import App from './components/App';
import { Provider } from 'react-redux';
const store = createStore(reducer);

import * as serviceWorker from './serviceWorker';

ReactDOM.render(
    <Provider store={store} >
        <App /> 
    </Provider>
, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
