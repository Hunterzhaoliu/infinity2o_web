import axios from 'axios';
import { FETCH_USER } from './types';

export const saveProfile = (values, history) => async dispatch => {
	const response = await axios.post('/api/profile', values);
	console.log('response', response);
	history.push('/profile');
	dispatch({ type: FETCH_USER, payload: response });
};
