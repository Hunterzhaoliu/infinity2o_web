export function getAskResearchQuestionButtonMessage(requestCount) {
	let message = null;
	switch (true) {
		case requestCount <= 1:
			message = 'Ask Research Question';
			break;
		case requestCount === 2:
			message = 'Ask Question';
			break;
		case requestCount >= 3:
			message = 'Ask';
			break;
	}

	return message;
}
