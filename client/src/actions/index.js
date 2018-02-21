import axios from 'axios';
import {
	SAVE_FETCHED_USER_AUTH,
	SAVE_FETCHED_USER_PROFILE,
	MOVE_TO_PROFILE
} from './types';
import { generateRandomColorThemeWith } from './colorTheme';

export const initializeApp = () => async dispatch => {
	const response = await axios.get('/api/current_user');
	dispatch({ type: SAVE_FETCHED_USER_AUTH, auth: response.data.auth });
	const loggedIn = response.data.auth !== undefined;
	if (loggedIn) {
		generateRandomColorThemeWith(dispatch);
		const hasProfile = response.data.profile.name !== undefined;
		if (!hasProfile) {
			dispatch({ type: MOVE_TO_PROFILE });
		} else {
			dispatch({ type: MOVE_TO_PROFILE }); // TODO: consider moving componentWillMount()
		}
	} else {
		generateRandomColorThemeWith(dispatch);
	}
};

export const fetchUserProfile = () => async dispatch => {
	const response = await axios.get('/api/current_user');
	dispatch({
		type: SAVE_FETCHED_USER_PROFILE,
		profile: response.data.profile
	});
};
