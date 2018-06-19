import axios from 'axios';
import { UPDATE_WINDOW_WIDTH, TOGGLE_SIDER } from './types';
import { store } from '../index';

export const updateWindowWidth = newWindowWidth => dispatch => {
	dispatch({
		type: UPDATE_WINDOW_WIDTH,
		newWindowWidth: newWindowWidth
	});
};

export const userLeftTab = () => async dispatch => {
	await axios.delete('/api/conversations/clients_online', {
		data: { mongoDBUserId: store.getState().auth.mongoDBUserId }
	});
};

export const toggleSider = () => dispatch => {
	dispatch({
		type: TOGGLE_SIDER
	});
};
