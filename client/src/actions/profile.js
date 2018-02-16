import axios from 'axios';
import { SAVE_PROFILE_START, SAVE_PROFILE_DONE } from './types';

export const saveProfile = values => async dispatch => {
	dispatch({ type: SAVE_PROFILE_START });
	const { dayDropdowns } = values;

	console.log('in profile.js values = ', values);
	console.log('dayDropdowns, not so confusing eh? = ', dayDropdowns);
	let allTimeSlots = [];
	//day.toString().substring(0, 3) + ' ' +
	Object.entries(dayDropdowns).forEach(function(day) {
		console.log('dayDropdowns.day = ', day);
		if (day !== undefined) {
			day.forEach(function(timeSlot) {
				console.log('dayDropdowns.day.timeSlot = ', timeSlot);
				debugger;
				allTimeSlots.push(timeSlot);
			});
		}
	});

	/*
	if (dayDropdowns.monday !== undefined) {
		dayDropdowns.monday.forEach(function(timeSlot) {
			allTimeSlots.push('M ' + timeSlot);
		});
	}
	if (dayDropdowns.tuesday !== undefined) {
		dayDropdowns.tuesday.forEach(function(timeSlot) {
			allTimeSlots.push('Tu ' + timeSlot);
		});
	}
	if (dayDropdowns.wednesday !== undefined) {
		dayDropdowns.wednesday.forEach(function(timeSlot) {
			allTimeSlots.push('W ' + timeSlot);
		});
	}
	if (dayDropdowns.thursday !== undefined) {
		dayDropdowns.thursday.forEach(function(timeSlot) {
			allTimeSlots.push('Th ' + timeSlot);
		});
	}
	if (dayDropdowns.friday !== undefined) {
		dayDropdowns.friday.forEach(function(timeSlot) {
			allTimeSlots.push('F ' + timeSlot);
		});
	}
	if (dayDropdowns.saturday !== undefined) {
		dayDropdowns.saturday.forEach(function(timeSlot) {
			allTimeSlots.push('Sa ' + timeSlot);
		});
	}
	if (dayDropdowns.sunday !== undefined) {
		dayDropdowns.sunday.forEach(function(timeSlot) {
			allTimeSlots.push('Su ' + timeSlot);
		});
	}
	*/
	values.availability = allTimeSlots;

	const response = await axios.post('/api/profile', values);
	dispatch({ type: SAVE_PROFILE_DONE, profile: response.data.profile });
};
