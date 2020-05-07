import React from 'react';
import { render } from 'react-dom';
import { createStore, applyMiddleware, compose } from 'redux';
import { Provider } from 'react-redux';
import { createLogger } from 'redux-logger';
import thunk from 'redux-thunk';
import { persistStore, persistReducer } from 'redux-persist';
import { PersistGate } from 'redux-persist/integration/react';
import sessionStorage from 'redux-persist/es/storage/session';
import reducer from './redux/reducers';
import { LicenseManager } from "ag-grid-enterprise";
import 'bootstrap/dist/css/bootstrap.min.css';
import App from './App.jsx';
import { agGridKey } from './components/utility/constants';
import '@7eleven/7boss-style/dist/bundle.css';
import './assets/scss/global.scss';
// import * as serviceWorker from './serviceWorker';

LicenseManager.setLicenseKey(agGridKey);

const middleware = [thunk];
if (process.env.NODE_ENV !== 'production') {
    middleware.push(createLogger());
}

const persistConfig = {
    key: 'root',
    storage: sessionStorage,
}

const persistedReducer = persistReducer(persistConfig, reducer);

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(
    persistedReducer,
    composeEnhancers(applyMiddleware(...middleware))
)

let persistor = persistStore(store)
export default store;

render(
    <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
            <App />
        </PersistGate>
    </Provider>,
    document.getElementById('root')
)

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
// serviceWorker.unregister();
