import axios from 'axios';
import {
	SAVE_FETCHED_USER_AUTH,
	SAVE_FETCHED_USER_PROFILE,
	UPDATE_TOTAL_USER_VOTES_ACROSS_ALL_SESSIONS,
	UPDATE_MATCHES_SEEN,
	UPDATE_OUR_SOCKET_ID,
	TOLD_DB_CLIENT_IS_ONLINE,
	TOLD_DB_CLIENT_IS_ONLINE_ERROR
} from './types';
import { updateWithSavedColorTheme } from './colorTheme';
import { store } from '../index';
import io from 'socket.io-client';
export let clientSocket;

function saveUserProfile(response, dispatch) {
	dispatch({
		type: SAVE_FETCHED_USER_PROFILE,
		profile: response.data.profile
	});

	// separate dispatch that goes to matches reducer
	dispatch({
		type: UPDATE_TOTAL_USER_VOTES_ACROSS_ALL_SESSIONS,
		additionalVotes: response.data.profile.asks.totalUserVotes
	});

	// separate dispatch that goes to customHeader reducer
	let numberOfUnseenMatches = 0;
	for (let i = 0; i < response.data.matches.length; i++) {
		if (response.data.matches[i]['seen'] === false) {
			numberOfUnseenMatches += 1;
		}
	}
	dispatch({
		type: UPDATE_MATCHES_SEEN,
		numberOfUnseenMatches: numberOfUnseenMatches,
		basicMatchInfo: response.data.matches
	});
}

async function storeUserSocketIdInRedis(
	dispatch,
	mongoDBUserId,
	userConversations,
	clientSocketId
) {
	const info = {
		mongoDBUserId: mongoDBUserId,
		userConversations: userConversations,
		clientSocketId: clientSocketId
	};

	console.log('storeUserSocketIdInRedis clientSocketId = ', clientSocketId);

	// puts user inside of redis and tells online contacts that user is online
	const clientIsOnlineResponse = await axios.post(
		'/api/conversations/user_online',
		info
	);

	// if (clientIsOnlineResponse.status === 200) {
	// 	// update user clientSocket id
	// 	dispatch({
	// 		type: UPDATE_OUR_SOCKET_ID,
	// 		ourSocketId: clientSocketId
	// 	});
	// 	dispatch({
	// 		type: TOLD_DB_CLIENT_IS_ONLINE
	// 	});
	// } else {
	// 	store.dispatch({ type: TOLD_DB_CLIENT_IS_ONLINE_ERROR });
	// }
}

export const initializeApp = () => async dispatch => {
	const response = await axios.get('/api/current_user');

	dispatch({
		type: SAVE_FETCHED_USER_AUTH,
		auth: response.data.auth,
		mongoDBUserId: response.data._id
	});
	if (store.getState().auth.loggedInState === 'logged_in') {
		console.log(
			'REACT_APP_SOCKET_DOMAIN = ',
			process.env.REACT_APP_SOCKET_DOMAIN
		);
		clientSocket = io(process.env.REACT_APP_SOCKET_DOMAIN, {
			reconnect: true,
			transports: ['websocket', 'polling']
		});

		clientSocket.on('connect', () => {
			// https://stackoverflow.com/questions/44270239/how-to-get-socket-id-of-a-connection-on-client-side
			console.log('clientSocket.id = ', clientSocket.id);
			storeUserSocketIdInRedis(
				dispatch,
				response.data.auth.mongoDBUserId,
				response.data.conversations,
				clientSocket.id
			);
		});

		saveUserProfile(response, dispatch);
		updateWithSavedColorTheme(dispatch, response.data.profile.colorTheme);
	}
};
