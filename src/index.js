import React from 'react';
import ReactDOM from 'react-dom';
import {Provider} from 'react-redux';
import {createStore, applyMiddleware, compose} from 'redux';
import App from './components/app';
import rootReducer from './reducers/index';
import reduxThunk from 'redux-thunk';


const createStoreWithMiddleware = applyMiddleware(reduxThunk)(createStore);

ReactDOM.render(
  <Provider store={createStoreWithMiddleware(rootReducer)}>
    <App/>
  </Provider>
  , document.querySelector('.container'));
