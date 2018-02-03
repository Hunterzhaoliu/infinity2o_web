import _ from 'lodash';
import React, { Component } from 'react';
import { reduxForm, Field } from 'redux-form';
import { Link } from 'react-router-dom';
import SurveyField from './SurveyField';
import validateEmails from '../../utils/validateEmails';
import formFields from './formFields';

class SurveyForm extends Component {
	renderFields() {
		return _.map(formFields, field => {
			return (
				<Field
					key={field.name}
					name={field.name}
					label={field.label}
					component={SurveyField}
					type="text"
				/>
			);
		});
	}

	render() {
		return (
			<div>
				<form
					onSubmit={this.props.handleSubmit(
						this.props.onSurveySubmit
					)}
				>
					{this.renderFields()}
					<Link
						to="/surveys"
						className="red btn-flat left white-text"
					>
						Cancel
					</Link>
					<button
						className="teal btn-flat right white-text"
						type="submit"
					>
						Next
						<i className="material-icons right">done</i>
					</button>
				</form>
			</div>
		);
	}
}

function validate(values) {
	const errors = {};

	errors.recipients = validateEmails(values.recipients || '');

	_.each(formFields, ({ name }) => {
		if (!values[name]) {
			errors[name] = 'must provide ' + name;
		}
	});

	return errors;
}

export default reduxForm({
	validate: validate,
	form: 'surveyForm',
	destroyOnUnmount: false
})(SurveyForm);
