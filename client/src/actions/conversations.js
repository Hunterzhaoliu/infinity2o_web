import { ON_CHANGE_TYPED_MESSAGE } from './types';

export const onChangeTypedMessage = newMessage => dispatch => {
	dispatch({
		type: ON_CHANGE_TYPED_MESSAGE,
		newMessage: newMessage
	});
};
