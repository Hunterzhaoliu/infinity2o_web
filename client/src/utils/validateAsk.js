// https://stackoverflow.com/questions/14088714/regular-expression-for-name-field-in-javascript-validation
const isValidQuestionRegex = /^[a-zA-Z0-9`~!@#$%^&*()-_+={}[\]:;'"<>,./\\ ]{8,50}[?]{0,1}$/;
const isValidAnswerRegex = /^[a-zA-Z0-9`~!@#$%^&*()-_+={}[\]:;'"<>,./\\ ]{2,25}$/;

export const isValidQuestion = question => {
	const isValidQuestion = isValidQuestionRegex.test(question) === true;

	if (isValidQuestion) {
		return true;
	} else {
		return false;
	}
};

export const isValidAnswer = answer => {
	const isValidAnswer = isValidAnswerRegex.test(answer) === true;

	if (isValidAnswer) {
		return true;
	} else {
		return false;
	}
};
