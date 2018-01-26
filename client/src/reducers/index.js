import { combineReducers } from 'redux';
import { reducer as askFormReducer } from 'redux-form';
import authReducer from './authReducer';
import colorThemeReducer from './colorThemeReducer';

export default combineReducers({
	colorTheme: colorThemeReducer,
	auth: authReducer,
	askForm: askFormReducer
});
