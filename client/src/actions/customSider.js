import { TOGGLE_SIDER } from './types';

export const toggleMenu = siderDisplay => dispatch => {
	dispatch({
		type: TOGGLE_SIDER,
		siderDisplay: siderDisplay
	});
};
