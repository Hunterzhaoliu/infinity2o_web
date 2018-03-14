import axios from 'axios';
import { SAVE_FETCHED_USER_AUTH, SAVE_FETCHED_USER_PROFILE } from './types';
import { generateRandomColorThemeWith } from './colorTheme';
import { fetchUserTrainAIAsks } from './trainAI';

export const initializeApp = () => async dispatch => {
	const response = await axios.get('/api/current_user');

	dispatch({
		type: SAVE_FETCHED_USER_AUTH,
		auth: response.data.auth,
		mongoDBUserId: response.data._id
	});

	console.log('response.data.id = ', response.data._id);
	if (response.data._id !== undefined) {
		fetchUserTrainAIAsks(dispatch, response.data._id);
	}

	// TODO: store previous color theme into database so we don't constantly switch
	generateRandomColorThemeWith(dispatch);
};

export const fetchUserProfile = () => async dispatch => {
	const response = await axios.get('/api/current_user');
	dispatch({
		type: SAVE_FETCHED_USER_PROFILE,
		profile: response.data.profile
	});
};
