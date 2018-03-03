//import axios from 'axios';
import { ON_VOTE } from './types';

export function onVote(answerChoosen) {
	return function(dispatch) {
		console.log('answerChoosen = ', answerChoosen);
		dispatch({ type: ON_VOTE, answerChoosen: answerChoosen });
	};
}
