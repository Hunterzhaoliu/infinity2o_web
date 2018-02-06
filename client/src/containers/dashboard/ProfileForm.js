import React, { Component } from 'react';
import { connect } from 'react-redux';
import { reduxForm, Field } from 'redux-form';
import InputField from './InputField';
import { Layout, Row, Form } from 'antd';
const { Content } = Layout;

class ProfileForm extends Component {
	render() {
		// console.log('this.props in ProfileForm.js', this.props);
		return (
			<Content
				style={{
					textAlign: 'center',
					padding: '100px 50px 81px', // top left&right bottom
					background: this.props.colorTheme.backgroundColor
				}}
			>
				<Form onSubmit={this.props.handleSubmit}>
					<Row type="flex" justify="start" align="middle">
						<Field
							name="question"
							label="Question: "
							component={InputField}
							type="text"
							colorTheme={this.props.colorTheme}
						/>
					</Row>
					<Row type="flex" justify="start" align="middle">
						<Field
							name="possibleAnswer"
							label="Answer 1: "
							component={InputField}
							type="text"
							colorTheme={this.props.colorTheme}
						/>
					</Row>
				</Form>
			</Content>
		);
	}
}

/*
So we have a state and a UI(with props).
This function gives the UI the parts of the state it will need to display.
*/
function mapStateToProps(state) {
	return {
		colorTheme: state.colorTheme
	};
}

ProfileForm = connect(mapStateToProps, null)(ProfileForm);

function validate(values) {
	const errors = {};

	if (values.question) {
		let acceptableQuestion =
			values.question.length >= 15 && values.question.length <= 150;
		if (!acceptableQuestion) {
			errors['question'] = 'between 15 & 150 characters pretty please';
			// TODO: show possible answers and submit button
		}
	}

	return errors;
}

export default reduxForm({
	validate: validate,
	form: 'profileForm' // state.form.profileForm
})(ProfileForm);
