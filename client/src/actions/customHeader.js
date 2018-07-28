import { UPDATE_WINDOW_DIMENSIONS, TOGGLE_SIDER } from "./types";

export const updateWindowDimensions = (
	newWindowWidth,
	newWindowHeight
) => dispatch => {
	dispatch({
		type: UPDATE_WINDOW_DIMENSIONS,
		newWindowWidth: newWindowWidth,
		newWindowHeight: newWindowHeight
	});
};

export const toggleSider = () => dispatch => {
	dispatch({
		type: TOGGLE_SIDER
	});
};
