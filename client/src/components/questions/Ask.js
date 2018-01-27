import React, { Component } from 'react';
import { connect } from 'react-redux';
import { reduxForm, Field } from 'redux-form';
import QuestionField from './QuestionField';
import { Layout, Row, Form } from 'antd';
const { Content } = Layout;
const FormItem = Form.Item;

class Ask extends Component {
	// constructor(props) {
	// 	super(props);
	//
	// 	this.state = { new: true };
	// }
	// state = { showFormReview: false };
	renderIfDuplicateQuestion() {
		// TODO: after db is full of questions
	}

	render() {
		return (
			<Content
				style={{
					textAlign: 'center',
					padding: '100px 50px 81px', // top left&right bottom
					background: this.props.colorTheme.backgroundColor
				}}
			>
				<Form>
					<Row type="flex" justify="start">
						<FormItem
							label=""
							validateStatus="success" // warning, validating, success
							help="Between 15 and 150 characters"
						>
							<Field
								name="QuestionField"
								component={QuestionField}
								type="text"
								placeholder={'ask away'}
							/>
						</FormItem>
					</Row>
					{this.renderIfDuplicateQuestion()}
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

Ask = connect(mapStateToProps, null)(Ask);

function validate(values) {
	const errors = {};

	// errors.recipients = validateEmails(values.recipients || '');
	//
	// _.each(formFields, ({ name }) => {
	// 	if (!values[name]) {
	// 		errors[name] = 'must provide ' + name;
	// 	}
	// });

	return errors;
}

export default reduxForm({
	validate: validate,
	askForm: 'askForm'
})(Ask);
