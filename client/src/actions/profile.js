import axios from 'axios';
import { FETCH_USER, SAVE_PROFILE_START, SAVE_PROFILE_DONE } from './types';

export const saveProfile = values => async dispatch => {
	dispatch({ type: SAVE_PROFILE_START });
	console.log('values = ', values);
	const response = await axios.post('/api/profile', values);
	console.log('response = ', response);
	dispatch({ type: FETCH_USER, payload: response });
	dispatch({ type: SAVE_PROFILE_DONE });
};
