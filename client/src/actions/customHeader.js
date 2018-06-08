import {
	UPDATE_WINDOW_WIDTH,
	UPDATE_WINDOW_HEIGHT,
	TOGGLE_SIDER
} from './types';

export const updateWindowWidth = newWindowWidth => dispatch => {
	dispatch({
		type: UPDATE_WINDOW_WIDTH,
		newWindowWidth: newWindowWidth
	});
};

export const updateWindowHeight = newWindowHeight => dispatch => {
	dispatch({
		type: UPDATE_WINDOW_HEIGHT,
		newWindowHeight: newWindowHeight
	});
};

export const toggleSider = () => dispatch => {
	dispatch({
		type: TOGGLE_SIDER
	});
};
