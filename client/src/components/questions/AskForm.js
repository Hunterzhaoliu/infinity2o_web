import React, { Component } from 'react';
import { connect } from 'react-redux';
import { reduxForm, Field } from 'redux-form';
import InputField from './InputField';
import { Layout, Row, Col, Form, Button, Icon } from 'antd';
const { Content } = Layout;
const FormItem = Form.Item;

class AskForm extends Component {
	renderIfDuplicateQuestion() {
		// TODO: after db is full of questions
	}

	render() {
		// console.log('this.props in AskForm.js', this.props);
		return (
			<Content
				style={{
					textAlign: 'center',
					padding: '100px 50px 81px', // top left&right bottom
					background: this.props.colorTheme.backgroundColor
				}}
			>
				<Row type="flex" justify="start">
					<Col>
						<Form onSubmit={this.props.handleSubmit}>
							<Field
								name="question"
								label="Question: "
								component={InputField}
								type="text"
								colorTheme={this.props.colorTheme}
							/>

							{this.renderIfDuplicateQuestion()}
						</Form>
					</Col>
				</Row>
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

AskForm = connect(mapStateToProps, null)(AskForm);

function validate(values) {
	const errors = {};

	if (values.question) {
		let acceptableQuestion =
			values.question.length >= 15 && values.question.length <= 150;
		if (!acceptableQuestion) {
			errors['question'] = 'between 15 & 150 characters pretty please';
		}
	}

	return errors;
}

export default reduxForm({
	validate: validate,
	form: 'askForm'
})(AskForm);
