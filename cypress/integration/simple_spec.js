describe('My First Test', function() {
	it('Does not do much!', function() {
		expect(true).to.equal(true);
	});
});

describe('landing page successfully loads', function() {
	it('has correct buttons', function() {
		cy.visit('/');

		cy.contains('Change Theme');
		cy.contains('Profile');
		cy.contains('Train AI');
		cy.contains('Matches');
	});
});

describe('Profile page successfully loads', function() {
	it('has correct buttons', function() {
		cy.visit('/profile');

		cy.contains('Edit Match Info.');
	});
});

describe('Train AI page successfully loads', function() {
	it('displays the correct Asks on Train AI', function() {
		cy.visit('/train_ai');

		// const question = 'question 100';
		// const example_ask = {
		// 	newQuestion: 'question 100',
		// 	newAnswers: ['1', '2', '3'],
		// 	questionLength: question.length,
		// 	hasQuestionError: false,
		// 	hasAnswersError: [false, false, false, false],
		// 	displayAddAnswerButton: true,
		// 	save: null
		// };
		//
		// cy.stub();
		//
		// cy.request('POST', '/api/ask', example_ask);
	});
});
