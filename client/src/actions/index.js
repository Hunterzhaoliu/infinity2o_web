import axios from 'axios';
import { FETCH_USER_AUTH } from './types';

export const fetchUserAuth = () => async dispatch => {
	const response = await axios.get('/api/current_user');
	dispatch({ type: FETCH_USER_AUTH, response: response });
};
