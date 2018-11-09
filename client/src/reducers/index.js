import { combineReducers } from "redux";
import authReducer from "./authReducer";
import colorThemeReducer from "./colorThemeReducer";
import customHeaderReducer from "./customHeaderReducer";
import landingReducer from "./landingReducer";
import profileReducer from "./profile/profileReducer";
import voteEditReducer from "./profile/voteEditReducer";
import askReducer from "./askReducer";
import sortingHatReducer from "./sortingHatReducer";
import matchesReducer from "./matchesReducer";
import contactsReducer from "./contactsReducer";
import chatReducer from "./chatReducer";
import aboutReducer from "./aboutReducer";

export default combineReducers({
	auth: authReducer,
	colorTheme: colorThemeReducer,
	customHeader: customHeaderReducer,
	landing: landingReducer,
	profile: profileReducer,
	voteEdit: voteEditReducer,
	ask: askReducer,
	sortingHat: sortingHatReducer,
	matches: matchesReducer,
	contacts: contactsReducer,
	chat: chatReducer,
	about: aboutReducer
});
