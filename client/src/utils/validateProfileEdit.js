// https://stackoverflow.com/questions/14088714/regular-expression-for-name-field-in-javascript-validation
const isValidNameRegex = /^[a-zA-Z ]{1,30}$/;
const isValidEmailRegex = /\S+@\S+\.\S+/;
const isValidUrlRegex = /^(ftp|http|https):\/\/[^ "]+$/;

export const isValidName = name => {
	const isValidName = isValidNameRegex.test(name) === true;

	if (isValidName) {
		return true;
	} else {
		return false;
	}
};

export const isValidEmail = email => {
	const isValidEmail = isValidEmailRegex.test(email) === true;

	if (isValidEmail) {
		return true;
	} else {
		return false;
	}
};

export const isValidUrl = url => {
	const isValidUrl = isValidUrlRegex.test(url) === true;

	if (isValidUrl) {
		return true;
	} else {
		return false;
	}
};

export const isValidAge = age => {
	const num_age = Number(age);
	const isNumber = !isNaN(num_age);

	if (isNumber) {
		if (num_age >= 13 && num_age <= 125) {
			return true;
		}
	}

	return false;
};

export const isValidInterests = interests => {
	if (interests !== undefined) {
		if (interests.length >= 1 && interests.length <= 5) {
			return true;
		}
	}

	return false;
};

export const isValidTimeSlots = dayDropdowns => {
	let num_time_slots_checked = 0;
	if (dayDropdowns !== undefined) {
		Object.entries(dayDropdowns).forEach(function(dayTimePair) {
			if (dayTimePair[1] !== undefined) {
				dayTimePair[1].forEach(function(timeSlot) {
					num_time_slots_checked += 1;
				});
			}
		});
	}
	if (num_time_slots_checked >= 2) {
		return true;
	}
	return false;
};
