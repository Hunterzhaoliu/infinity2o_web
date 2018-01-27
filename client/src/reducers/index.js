import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';
import authReducer from './authReducer';
import colorThemeReducer from './colorThemeReducer';

export default combineReducers({
	colorTheme: colorThemeReducer,
	auth: authReducer,
	form: formReducer
});
