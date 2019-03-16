import { UPDATE_WINDOW_DIMENSIONS, TOGGLE_MENU } from "./types";

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

export const toggleMenu = () => dispatch => {
	dispatch({
		type: TOGGLE_MENU
	});
};
