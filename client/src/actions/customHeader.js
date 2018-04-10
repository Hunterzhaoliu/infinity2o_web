import { UPDATE_WINDOW_WIDTH } from './types';

export const updateWindowWidth = newWindowWidth => dispatch => {
	dispatch({
		type: UPDATE_WINDOW_WIDTH,
		newWindowWidth: newWindowWidth
	});
};
