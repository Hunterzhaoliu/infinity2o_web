import {
	ON_PRESS_PAGE,
	FETCH_ASK_TO_REVOTE_START,
	FETCH_ASK_TO_REVOTE_DONE,
	FETCH_ASK_TO_REVOTE_ERROR
} from '../types';

export const onPressPage = newPage => dispatch => {
	dispatch({ type: ON_PRESS_PAGE, newPage: newPage });
};

export const onPressAsk = (mongoDBAskId, index) => dispatch => {
	dispatch({ type: FETCH_ASK_TO_REVOTE_START, index: index });

	//dispatch({ type: FETCH_ASK_TO_REVOTE_DONE, index: index });
	//dispatch({ type: FETCH_ASK_TO_REVOTE_ERROR, index: index });
};
