import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware, compose } from 'redux';
import reduxThunk from 'redux-thunk';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage'; // defaults to localStorage for web and AsyncStorage for react-native
import { PersistGate } from 'redux-persist/integration/react';

import App from './containers/App';
import reducers from './reducers';

const persistConfig = {
	key: 'root',
	storage: storage,
	whitelist: ['colorTheme', 'auth', 'profile']
};

const persistedReducer = persistReducer(persistConfig, reducers);

// development only
// import axios from 'axios';
// window.axios = axios;

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
export const store = createStore(
	persistedReducer,
	{},
	composeEnhancers(applyMiddleware(reduxThunk))
);
let persistor = persistStore(store);

ReactDOM.render(
	<Provider store={store}>
		<PersistGate loading={null} persistor={persistor}>
			<App />
		</PersistGate>
	</Provider>,
	document.querySelector('#root')
);
