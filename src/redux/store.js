import { createStore, applyMiddleware, compose } from 'redux';
import { createLogger } from 'redux-logger';
import thunk from 'redux-thunk';
import rootReducer from './reducers';

const middleware=[
    createLogger(),
    thunk
];

export default createStore(
    rootReducer,
    undefined,
    compose(
        applyMiddleware(...middleware),
        window.devToolsExtension ? window.devToolsExtension() : f => f
    )
);