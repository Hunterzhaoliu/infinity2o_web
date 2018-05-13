import { ON_PRESS_PAGE } from '../types';

export const onPressPage = newPage => dispatch => {
	dispatch({ type: ON_PRESS_PAGE, newPage: newPage });
};
