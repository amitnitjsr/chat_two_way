import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';

/**
 * redux 
 */
import { createStore } from 'redux';
import { Provider } from 'react-redux';

/**
 * import user define Reducer
 */
import Reducer from './Reducers/Reducer';

/**
 * create Store
 */
const store = createStore(Reducer);

/**
 * wrape App component with Provider and give store
 */
ReactDOM.render(<Provider store={store} > <App /> </Provider>, document.getElementById('root'));
registerServiceWorker();
