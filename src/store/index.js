import { fromJS } from 'immutable';
import { createStore, applyMiddleware, compose } from 'redux';
import { routerMiddleware } from 'react-router-redux';
import thunk from 'redux-thunk';

import api from '../middleware/api';
import rootReducer from '../reducers';

const devtools = window.devToolsExtension || (() => noop => noop);

export default function configureStore(history) {
    const middlewares = [
        thunk,
        api,
        routerMiddleware(history),
    ];

    const enhancers = [
        applyMiddleware(...middlewares),
        devtools(),
    ];

    return createStore(
        rootReducer,
        fromJS({}),
        compose(...enhancers)
    );
}
