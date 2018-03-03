// https://stackoverflow.com/questions/14088714/regular-expression-for-name-field-in-javascript-validation
const isValidQuestionRegex = /^[a-zA-Z0-9.$%& ]{8,50}[?]{0,1}$/;
const isValidAnswerRegex = /^[a-zA-Z0-9.$%& ]{2,25}$/;

export const isValidQuestion = question => {
	const isValidQuestion = isValidQuestionRegex.test(question) === true;

	if (isValidQuestion) {
		return true;
	} else {
		return false;
	}
};

export const isValidAnswer = answer => {
	console.log('answer = ', answer);
	const isValidAnswer = isValidAnswerRegex.test(answer) === true;
	console.log('isValidAnswer = ', isValidAnswer);

	if (isValidAnswer) {
		return true;
	} else {
		return false;
	}
};
