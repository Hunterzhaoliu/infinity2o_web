import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';
import authReducer from './authReducer';
import colorThemeReducer from './colorThemeReducer';
import profileReducer from './profileReducer';

export default combineReducers({
	colorTheme: colorThemeReducer,
	auth: authReducer,
	form: formReducer,
	profile: profileReducer
});
