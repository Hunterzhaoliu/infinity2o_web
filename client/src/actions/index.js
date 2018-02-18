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
	if (loggedIn) {
		generateRandomColorThemeWith(dispatch);
		const hasProfile = response.data.profile.name !== undefined;
		if (!hasProfile) {
			dispatch({ type: MOVE_TO_PROFILE });
		} else {
			// TODO: change to move to Train AI & history.push(/train_ai)
			dispatch({ type: MOVE_TO_PROFILE });
		}
	} else {
		console.log('user not logged in');
		generateRandomColorThemeWith(dispatch);
	}
};
