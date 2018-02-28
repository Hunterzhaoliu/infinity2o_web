import { combineReducers } from 'redux';
import authReducer from './authReducer';
import colorThemeReducer from './colorThemeReducer';
import profileReducer from './profileReducer';
import askReducer from './askReducer';

export default combineReducers({
	colorTheme: colorThemeReducer,
	auth: authReducer,
	profile: profileReducer,
	ask: askReducer
});
