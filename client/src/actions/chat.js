import {
	ON_CHANGE_TYPED_MESSAGE,
	SET_CHAT_LOADING,
	SET_CHAT_HAS_MORE,
	DISPLAY_MORE_MESSAGES
} from './types';

export const onChangeTypedMessage = newMessage => dispatch => {
	dispatch({
		type: ON_CHANGE_TYPED_MESSAGE,
		newMessage: newMessage
	});
};

export const setLoading = (loading, dispatch) => {
	dispatch({
		type: SET_CHAT_LOADING,
		loading: loading
	});
};

export const setHasMore = (hasMore, dispatch) => {
	dispatch({
		type: SET_CHAT_HAS_MORE,
		hasMore: hasMore
	});
};

export const displayMoreMessages = (numberOfMessages, dispatch) => {
	dispatch({
		type: DISPLAY_MORE_MESSAGES,
		numberOfMessages: numberOfMessages
	});
};
