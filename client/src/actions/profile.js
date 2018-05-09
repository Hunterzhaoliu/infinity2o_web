import axios from 'axios';
import {
	ON_CHANGE_NAME,
	ON_CHANGE_AGE,
	ON_CHANGE_INTERESTS,
	ON_CHANGE_TIME_ZONE,
	ON_CHANGE_TIME_SLOT,
	SAVE_PROFILE_START,
	SAVE_PROFILE_DONE,
	SAVE_PROFILE_ERROR,
	DECREMENT_NEURONS,
	DECREMENT_NEURONS_ERROR,
	ON_CHANGE_EMAIL
} from './types';
import {
	isValidName,
	isValidAge,
	isValidInterests,
	isValidEmail
} from '../utils/validateProfileEdit';

export const onChangeName = newName => dispatch => {
	if (isValidName(newName)) {
		dispatch({ type: ON_CHANGE_NAME, newName: newName, hasError: false });
	} else {
		dispatch({ type: ON_CHANGE_NAME, newName: newName, hasError: true });
	}
};

export const onChangeEmail = newEmail => dispatch => {
	if (isValidEmail(newEmail)) {
		dispatch({
			type: ON_CHANGE_EMAIL,
			newEmail: newEmail,
			hasError: false
		});
	} else {
		dispatch({ type: ON_CHANGE_EMAIL, newEmail: newEmail, hasError: true });
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

export const onChangeTimeSlot = newTimeSlot => dispatch => {
	dispatch({
		type: ON_CHANGE_TIME_SLOT,
		newTimeSlot: newTimeSlot,
		hasError: false
	});
};

export const saveProfile = (values, history) => async dispatch => {
	dispatch({ type: SAVE_PROFILE_START });
	// if the user already has profile data saved and makes a edit to one
	// field we need to make sure we send the old unedited data for profile
	if (values.newName === null) {
		values.newName = values.name;
	}
	if (values.newAge === null) {
		values.newAge = values.age;
	}
	if (values.newInterests.length === 0) {
		values.newInterests = values.interests;
	}
	if (values.newTimeZone === null) {
		values.newTimeZone = values.timeZone;
	}
	if (Object.keys(values.newAvailability).length === 0) {
		values.newAvailability = values.availability;
	}
	const response = await axios.post('/api/profile', values);
	if (response.status === 200) {
		dispatch({ type: SAVE_PROFILE_DONE });
		history.push('/profile');
	} else {
		dispatch({ type: SAVE_PROFILE_ERROR });
	}
};

export const decrementNeurons = (
	decrementAmount,
	mongoDBUserId
) => async dispatch => {
	const paymentInfo = {
		decrementAmount: decrementAmount,
		mongoDBUserId: mongoDBUserId
	};
	const response = await axios.put(
		'/api/profile/decrease_neurons',
		paymentInfo
	);
	if (response.status === 200) {
		dispatch({
			type: DECREMENT_NEURONS,
			decrementAmount: decrementAmount
		});
	} else {
		dispatch({ type: DECREMENT_NEURONS_ERROR });
	}
};
