import axios from 'axios';
import {
	ON_CHANGE_NAME,
	ON_CHANGE_AGE,
	ON_CHANGE_INTERESTS,
	ON_CHANGE_TIME_ZONE,
	SAVE_PROFILE_START,
	SAVE_PROFILE_DONE
} from './types';
import {
	isValidName,
	isValidAge,
	isValidInterests,
	isValidTimeSlots
} from '../utils/validate';

export const onChangeName = newName => dispatch => {
	if (isValidName(newName)) {
		dispatch({ type: ON_CHANGE_NAME, newName: newName, hasError: false });
	} else {
		dispatch({ type: ON_CHANGE_NAME, newName: newName, hasError: true });
	}
};

export const onChangeAge = newAge => dispatch => {
	if (isValidAge(newAge)) {
		dispatch({ type: ON_CHANGE_AGE, newAge: newAge, hasError: false });
	} else {
		dispatch({ type: ON_CHANGE_AGE, newAge: newAge, hasError: true });
	}
};

export const onChangeInterests = newInterests => dispatch => {
	if (isValidInterests(newInterests)) {
		dispatch({
			type: ON_CHANGE_INTERESTS,
			newInterests: newInterests,
			hasError: false
		});
	} else {
		dispatch({
			type: ON_CHANGE_INTERESTS,
			newInterests: newInterests,
			hasError: true
		});
	}
};

export const onChangeTimeZone = newTimeZone => dispatch => {
	if (
		newTimeZone !== 'europe' &&
		newTimeZone !== 'canada' &&
		newTimeZone !== 'united_states'
	) {
		dispatch({
			type: ON_CHANGE_TIME_ZONE,
			newTimeZone: newTimeZone,
			hasError: false
		});
	} else {
		dispatch({
			type: ON_CHANGE_TIME_ZONE,
			newTimeZone: newTimeZone,
			hasError: true
		});
	}
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
