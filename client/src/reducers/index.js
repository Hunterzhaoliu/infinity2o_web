import { combineReducers } from 'redux';
import authReducer from './authReducer';
import colorThemeReducer from './colorThemeReducer';
import profileReducer from './profileReducer';
import askReducer from './askReducer';
import trainAIReducer from './trainAIReducer';
import matchesReducer from './matchesReducer';
import conversationsReducer from './conversationsReducer';

export default combineReducers({
	colorTheme: colorThemeReducer,
	auth: authReducer,
	profile: profileReducer,
	ask: askReducer,
	trainAI: trainAIReducer,
	matches: matchesReducer,
	conversations: conversationsReducer
});
