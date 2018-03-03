// https://stackoverflow.com/questions/14088714/regular-expression-for-name-field-in-javascript-validation
const isValidQAndARegex = /^[a-zA-Z ]{1,50}$/;

export const isValidQuestion = question => {
	const isValidQuestion = isValidQAndARegex.test(question) === true;

	if (isValidQuestion) {
		return true;
	} else {
		return false;
	}
};

export const isValidAnswer = answer => {
	const isValidAnswer = isValidQAndARegex.test(answer) === true;

	if (isValidAnswer) {
		return true;
	} else {
		return false;
	}
};
