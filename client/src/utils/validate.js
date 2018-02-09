const isEmailRegex = /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;

// https://stackoverflow.com/questions/14088714/regular-expression-for-name-field-in-javascript-validation
const isValidNameRegex = /^[a-zA-Z ]{1,30}$/;

export const validateEmails = emails => {
	const invalidEmailsArray = emails
		.split(',')
		.map(email => email.trim())
		.filter(email => isEmailRegex.test(email) === false);

	if (invalidEmailsArray.length) {
		return `These emails are invalid: ${invalidEmailsArray}`;
	} else {
		return;
	}
};

export const isValidName = name => {
	const isValidName = isValidNameRegex.test(name) === true;

	if (isValidName) {
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
