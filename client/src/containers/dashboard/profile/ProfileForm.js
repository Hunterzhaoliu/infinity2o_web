import React, { Component } from 'react';
import { connect } from 'react-redux';
import { reduxForm, Field } from 'redux-form';
import InputTimeZone from './InputTimeZone';
import InputField from './InputField';
import InputFieldNumber from './InputFieldNumber';
import InputFieldSelect from './InputFieldSelect';
import { isValidName } from '../../../utils/validate';
import { Layout, Row, Form, Col, Menu, Dropdown, Icon, Checkbox } from 'antd';
const { Content } = Layout;
const CheckboxGroup = Checkbox.Group;

const plainOptions = ['7-9 AM', '9-11 AM', '11 AM -1 PM'];
class ProfileForm extends Component {
	state = {
		inputValue: 0,
		checkedList: [],
		indeterminate: true,
		checkAll: false,
		visible: false
	};

	onSchedChange = checkedList => {
		this.setState({
			checkedList,
			indeterminate:
				!!checkedList.length &&
				checkedList.length < plainOptions.length,
			checkAll: checkedList.length === plainOptions.length
		});
	};

	onCheckAllChange = e => {
		this.setState({
			checkedList: e.target.checked ? plainOptions : [],
			indeterminate: false,
			checkAll: e.target.checked
		});
	};

	handleVisibleChange = flag => {
		this.setState({ visible: flag });
	};

	render() {
		// console.log('this.props in ProfileForm.js', this.props);
		const menu = (
			<Menu>
				<Menu.Item>
					<div>
						<div style={{ borderBottom: '1px solid #E9E9E9' }}>
							<Checkbox
								indeterminate={this.state.indeterminate}
								onChange={this.onCheckAllChange}
								checked={this.state.checkAll}
							>
								Check all
							</Checkbox>
						</div>
						<br />
						<CheckboxGroup
							options={plainOptions}
							value={this.state.checkedList}
							onChange={this.onSchedChange}
						/>
					</div>
				</Menu.Item>
			</Menu>
		);

		return (
			<Content
				style={{
					padding: '0% 0% 0%', // top left&right bottom
					background: this.props.colorTheme.backgroundColor
				}}
			>
				<Form onSubmit={this.props.handleSubmit}>
					<Row
						type="flex"
						justify="start"
						style={{
							padding: '2% 0% 0%' // top left&right bottom
						}}
					>
						<Col>
							<Field
								name="name"
								label="First Name:"
								width={280}
								component={InputField}
								type="text"
							/>
						</Col>
					</Row>
					<Row
						type="flex"
						justify="start"
						style={{
							padding: '2% 0% 0%' // top left&right bottom
						}}
					>
						<Col>
							<Field
								name="age"
								label="Age:"
								width={68}
								min={10}
								max={125}
								defaultValue={18}
								component={InputFieldNumber}
								type="text"
							/>
						</Col>
					</Row>
					<Row
						type="flex"
						justify="start"
						style={{
							padding: '3% 0% 0%' // top left&right bottom
						}}
					>
						<Col>
							<Field
								name="interests"
								label="Interest(s):"
								placeholder="What are you curious about?"
								width={280}
								component={InputFieldSelect}
								type="text"
							/>
						</Col>
					</Row>
					<Row
						type="flex"
						justify="start"
						style={{
							padding: '4% 0% 0%' // top left&right bottom
						}}
					>
						<Col>
							<p
								style={{
									color: this.props.colorTheme.text2Color
								}}
							>
								When are you free to video chat for about 1.5
								hours for your class?
							</p>
							<Dropdown
								overlay={menu}
								onVisibleChange={this.handleVisibleChange}
								visible={this.state.visible}
								style={{
									borderColor: this.props.colorTheme
										.text6Color
								}}
							>
								<a className="ant-dropdown-link">
									Monday <Icon type="down" />
								</a>
							</Dropdown>
						</Col>
					</Row>
					<Row
						type="flex"
						justify="start"
						style={{
							padding: '3% 0% 0%' // top left&right bottom
						}}
					>
						<Col>
							<InputTimeZone
								style={{
									color: this.props.colorTheme.text2Color
								}}
							/>
						</Col>
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

	if (!isValidName(values.name)) {
		errors['name'] = 'Cool name! But we need between 1 & 30 valid letters';
	}

	return errors;
}

export default reduxForm({
	validate: validate,
	form: 'profileForm' // state.form.profileForm
})(ProfileForm);
