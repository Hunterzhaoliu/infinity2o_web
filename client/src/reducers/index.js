import { combineReducers } from 'redux';
import authReducer from './authReducer';
import colorThemeReducer from './colorThemeReducer';
import profileReducer from './profileReducer';

export default combineReducers({
	colorTheme: colorThemeReducer,
	auth: authReducer,
	profile: profileReducer
});
