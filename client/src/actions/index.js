import axios from 'axios';
import {
	FETCH_USER_AUTH,
	FETCH_USER_PROFILE,
	MOVE_TO_PROFILE,
	MOVE_TO_TRAIN_AI
} from './types';
import { generateRandomColorThemeWith } from './colorTheme';

export const fetchUser = () => async dispatch => {
	const response = await axios.get('/api/current_user');
	dispatch({ type: FETCH_USER_AUTH, auth: response.data.auth });
	dispatch({ type: FETCH_USER_PROFILE, profile: response.data.profile });
	const loggedIn = response.data.auth !== undefined;
	const hasProfile = response.data.profile.name !== undefined;
	if (loggedIn) {
		generateRandomColorThemeWith(dispatch);
		if (hasProfile) {
			dispatch({ type: MOVE_TO_TRAIN_AI });
		} else {
			dispatch({ type: MOVE_TO_PROFILE });
		}
	} else {
		console.log('user not logged in');
		generateRandomColorThemeWith(dispatch);
	}
};
