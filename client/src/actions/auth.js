import axios from 'axios';
import {
	SAVE_FETCHED_USER_AUTH,
	SAVE_FETCHED_USER_PROFILE,
	UPDATE_TOTAL_USER_VOTES_ACROSS_ALL_SESSIONS,
	UPDATE_MATCHES_SEEN,
	UPDATE_OUR_SOCKET_ID,
	UPDATE_CONTACT_WITH_NEW_USER_SOCKET_ID,
	TOLD_REDIS_CLIENT_IS_ONLINE,
	TOLD_REDIS_CLIENT_IS_ONLINE_ERROR
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

	// puts user inside of redis and tells online contacts that user is online
	const clientIsOnlineResponse = await axios.post(
		'/api/conversations/user_online',
		info
	);

	if (clientIsOnlineResponse.status === 200) {
		// update user clientSocket id
		dispatch({
			type: UPDATE_OUR_SOCKET_ID,
			ourSocketId: clientSocketId
		});
		dispatch({
			type: TOLD_REDIS_CLIENT_IS_ONLINE
		});
	} else {
		store.dispatch({ type: TOLD_REDIS_CLIENT_IS_ONLINE_ERROR });
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
		//console.log('window.location.href = ', window.location.href);
		if (window.location.href.includes('infinity2o-staging')) {
			clientSocket = io(process.env.REACT_APP_SOCKET_DOMAIN_STAGING, {
				transports: ['websocket']
			});
			//console.log('in STAGING');
		} else {
			// in DEVELOPMENT or PRODUCTION
			clientSocket = io(process.env.REACT_APP_SOCKET_DOMAIN, {
				transports: ['websocket']
			});
			//console.log('in DEVELOPMENT or PRODUCTION');
		}

		clientSocket.on('connect', () => {
			// https://stackoverflow.com/questions/44270239/how-to-get-socket-id-of-a-connection-on-client-side
			storeUserSocketIdInRedis(
				dispatch,
				response.data.auth.mongoDBUserId,
				response.data.conversations,
				clientSocket.id
			);
		});

		// listen for when any contacts come online
		clientSocket.on(
			'TELL_CONTACT_X:ONE_OF_YOUR_CONTACTS_IS_ONLINE',
			function(newUserSocketInfo) {
				// console.log(
				// 	'TELL_CONTACT_X:ONE_OF_YOUR_CONTACTS_IS_ONLINE newUserSocketInfo = ',
				// 	newUserSocketInfo
				// );

				// telling an online contact the user's new clientSocket id
				dispatch({
					type: UPDATE_CONTACT_WITH_NEW_USER_SOCKET_ID,
					newUserSocketInfo: newUserSocketInfo
				});
			}
		);

		saveUserProfile(response, dispatch);
		updateWithSavedColorTheme(dispatch, response.data.profile.colorTheme);
	}
};
