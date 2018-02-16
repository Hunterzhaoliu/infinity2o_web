import axios from 'axios';
import { FETCH_USER_AUTH, FETCH_USER_PROFILE } from './types';

export const fetchUser = () => async dispatch => {
	const response = await axios.get('/api/current_user');
	dispatch({ type: FETCH_USER_AUTH, auth: response.data.auth });
	dispatch({ type: FETCH_USER_PROFILE, profile: response.data.profile });
};
