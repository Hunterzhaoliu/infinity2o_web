import axios from 'axios';
import { ON_CHANGE_NAME, SAVE_PROFILE_START, SAVE_PROFILE_DONE } from './types';

export const onChangeName = newName => dispatch => {
	dispatch({ type: ON_CHANGE_NAME, newName: newName });
};

export const saveProfile = values => async dispatch => {
	dispatch({ type: SAVE_PROFILE_START });
	const { dayDropdowns } = values;

	let allTimeSlots = [];

	Object.entries(dayDropdowns).forEach(function(dayTimePair) {
		if (dayTimePair[1] !== undefined) {
			dayTimePair[1].forEach(function(time) {
				allTimeSlots.push(
					dayTimePair[0].toString().substring(0, 3) + ' ' + time
				);
			});
		}
	});

	values.availability = allTimeSlots;

	const response = await axios.post('/api/profile', values);
	dispatch({ type: SAVE_PROFILE_DONE, profile: response.data.profile });
};
