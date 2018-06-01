import { combineReducers } from 'redux';
import authReducer from './authReducer';
import colorThemeReducer from './colorThemeReducer';
import profileReducer from './profile/profileReducer';
import voteEditReducer from './profile/voteEditReducer';
import askReducer from './askReducer';
import sortingHatReducer from './sortingHatReducer';
import matchesReducer from './matchesReducer';
import chatReducer from './chatReducer';
import contactsReducer from './contactsReducer';
import customHeaderReducer from './customHeaderReducer';

export default combineReducers({
	colorTheme: colorThemeReducer,
	customHeader: customHeaderReducer,
	auth: authReducer,
	profile: profileReducer,
	voteEdit: voteEditReducer,
	ask: askReducer,
	sortingHat: sortingHatReducer,
	matches: matchesReducer,
	contacts: contactsReducer,
	chat: chatReducer
});
