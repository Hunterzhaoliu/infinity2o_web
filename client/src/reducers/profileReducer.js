import {
	SAVE_FETCHED_USER_PROFILE,
	ON_CHANGE_NAME,
	ON_CHANGE_AGE,
	ON_CHANGE_INTERESTS,
	ON_CHANGE_TIME_ZONE,
	ON_CHANGE_TIME_SLOT,
	SAVE_PROFILE_START,
	SAVE_PROFILE_DONE,
	SAVE_PROFILE_ERROR
} from '../actions/types';

let cloneObject = obj => {
	return JSON.parse(JSON.stringify(obj));
};

let initialState = {
	name: null,
	age: null,
	interests: [],
	timeZone: null,
	availability: {},
	newName: null,
	newAge: null,
	newInterests: [],
	newTimeZone: null,
	newAvailability: {},
	hasAgeError: false,
	hasNameError: false,
	hasInterestsError: false,
	hasTimeZoneError: false,
	hasAvailabilityError: false
};

export default function(state = initialState, action) {
	let newState = cloneObject(state);
	switch (action.type) {
		case SAVE_FETCHED_USER_PROFILE:
			newState.name = action.profile.name;
			newState.age = action.profile.age;
			newState.interests = action.profile.interests;
			newState.timeZone = action.profile.timeZone;
			newState.availability = action.profile.availability;
			newState.newName = action.profile.name;
			newState.newAge = action.profile.age;
			newState.newInterests = action.profile.interests;
			newState.newTimeZone = action.profile.timeZone;
			newState.newAvailability = action.profile.availability;
			return newState;
		case ON_CHANGE_NAME:
			newState.newName = action.newName;
			newState.hasNameError = action.hasError;
			return newState;
		case ON_CHANGE_AGE:
			newState.newAge = action.newAge;
			newState.hasAgeError = action.hasError;
			return newState;
		case ON_CHANGE_INTERESTS:
			newState.newInterests = action.newInterests;
			newState.hasInterestsError = action.hasError;
			return newState;
		case ON_CHANGE_TIME_ZONE:
			newState.newTimeZone = action.newTimeZone;
			newState.hasTimeZoneError = action.hasError;
			return newState;
		case ON_CHANGE_TIME_SLOT:
			const dayValue = action.newTimeSlot[0];
			const timeSlot = action.newTimeSlot[1];
			if (newState.newAvailability === undefined) {
				newState.newAvailability = {};
			}
			if (newState.newAvailability[dayValue] !== undefined) {
				let i = newState.newAvailability[dayValue].indexOf(timeSlot);
				if (i !== -1) {
					// time slot is already checked so uncheck by removind
					newState.newAvailability[dayValue].splice(i, 1);
				} else {
					newState.newAvailability[dayValue].push(timeSlot);
				}
			} else {
				newState.newAvailability[dayValue] = [];
				newState.newAvailability[dayValue].push(timeSlot);
			}

			return newState;
		case SAVE_PROFILE_START:
			newState.save = 'save_start';
			return newState;
		case SAVE_PROFILE_DONE:
			newState.save = 'save_success';
			return newState;
		case SAVE_PROFILE_ERROR:
			newState.save = 'save_error';
			return newState;
		default:
			return state;
	}
}
