//import axios from 'axios';
import { ON_VOTE } from './types';

export function onVote(answerChosen) {
	return function(dispatch) {
		dispatch({ type: ON_VOTE, answerChosen: answerChosen });
	};
}
