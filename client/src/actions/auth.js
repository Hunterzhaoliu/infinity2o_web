import axios from 'axios';
import {
	SAVE_FETCHED_USER_AUTH,
	SAVE_FETCHED_USER_PROFILE,
	UPDATE_TOTAL_USER_VOTES_ACROSS_ALL_SESSIONS,
	UPDATE_MATCHES_SEEN
} from './types';
import { updateWithSavedColorTheme } from './colorTheme';
import { store } from '../index';
import io from 'socket.io-client';
export let socket;

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

async function storeInRedisUserIsOnline(
	dispatch,
	mongoDBUserId,
	userConversations
) {
	const response = await axios.get(
		'/api/conversations/clients_online?mongoDBUserId=' + mongoDBUserId
	);
	// console.log('response.data = ', response.data);
	// somehow the socket gets parsed when the user is already inside of redis
	const alreadyStoredSocket = response.data;

	// console.log('alreadyStoredSocket = ', alreadyStoredSocket);
	if (alreadyStoredSocket === 'not online') {
		socket = io(process.env.REACT_APP_SOCKET_DOMAIN, {
			transports: ['websocket']
		});
		console.log('original socket = ', socket);
		console.log('original socket.id = ', socket.id);
		console.log('original socket[id] = ', socket['id']);

		const info = {
			mongoDBUserId: mongoDBUserId,
			socketId: socket.id,
			userConversations: userConversations,
			socket: socket
		};

		// puts user inside of clientsInConversation and tells online contacts that user is online
		await axios.post('/api/conversations/clients_online', info);
	} else {
		socket = alreadyStoredSocket;
		console.log('socket from already connected user = ', socket);
		console.log('socket.id from already connected user = ', socket.id);
	}
}

export const initializeApp = () => async dispatch => {
	const response = await axios.get('/api/current_user');

	dispatch({
		type: SAVE_FETCHED_USER_AUTH,
		auth: response.data.auth,
		mongoDBUserId: response.data._id
	});

	if (store.getState().auth.loggedInState === 'logged_in') {
		storeInRedisUserIsOnline(
			dispatch,
			response.data.auth.mongoDBUserId,
			response.data.conversations
		);

		saveUserProfile(response, dispatch);
		updateWithSavedColorTheme(dispatch, response.data.profile.colorTheme);
	}
};
