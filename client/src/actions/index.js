import axios from 'axios';
import { SAVE_FETCHED_USER_AUTH, SAVE_FETCHED_USER_PROFILE } from './types';
import { generateRandomColorThemeWith } from './colorTheme';

export const initializeApp = () => async dispatch => {
	const response = await axios.get('/api/current_user');
	generateRandomColorThemeWith(dispatch);
	dispatch({ type: SAVE_FETCHED_USER_AUTH, auth: response.data.auth });
};

export const fetchUserProfile = () => async dispatch => {
	const response = await axios.get('/api/current_user');
	dispatch({
		type: SAVE_FETCHED_USER_PROFILE,
		profile: response.data.profile
	});
};
