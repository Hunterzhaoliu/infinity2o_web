import React, { Component } from 'react';
import { connect } from 'react-redux';
import { reduxForm, Field } from 'redux-form';
import InputTimeZone from './InputTimeZone';
import InputField from './InputField';
import {
	Layout,
	Row,
	Form,
	Select,
	Slider,
	InputNumber,
	Col,
	Menu,
	Dropdown,
	Icon,
	Checkbox
} from 'antd';
const { Option } = Select;
const FormItem = Form.Item;
const { Content } = Layout;
const CheckboxGroup = Checkbox.Group;

const plainOptions = ['7-9 AM', '9-11 AM', '11 AM -1 PM'];
class ProfileForm extends Component {
	state = {
		inputValue: 0,
		checkedList: []
		//indeterminate: true,
		//checkAll: false
	};
	onChange = (value, checkedList) => {
		this.setState({
			inputValue: value,
			checkedList
			//indeterminate:
			//!!checkedList.length && checkedList.length < plainOptions.length,
			//checkAll: checkedList.length === plainOptions.length
		});
	};
	onCheckAllChange = e => {
		this.setState({
			checkedList: e.target.checked ? plainOptions : [],
			indeterminate: false,
			checkAll: e.target.checked
		});
	};
	render() {
		const formItemLayout = {
			labelCol: { span: 6 },
			wrapperCol: { span: 14 }
		};
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
							onChange={this.onChange}
						/>
					</div>
				</Menu.Item>
			</Menu>
		);
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
							name="name"
							label="Name "
							component={InputField}
							type="text"
							colorTheme={this.props.colorTheme}
						/>
					</Row>
					<FormItem
						{...formItemLayout}
						label="Interest(s)"
						colorTheme={this.props.colorTheme}
					>
						<Select
							mode="multiple"
							placeholder="Select what you're curious about"
						>
							<Option value="Computer Science">
								Computer Science
							</Option>
							<Option value="Business">Business</Option>
						</Select>
					</FormItem>
					<Row type="flex" justify="start" align="middle">
						<Col span={12}>
							<FormItem
								label="# Hours/Week Availabe"
								colorTheme={this.props.colorTheme}
							>
								<Slider
									marks={{
										1: '1 or less',
										20: '20',
										40: '40 or more'
									}}
									min={1}
									max={40}
									onChange={this.onChange}
									value={this.state.inputValue}
								/>
							</FormItem>
						</Col>
						<Col span={4}>
							<InputNumber
								min={0}
								max={40}
								style={{ marginLeft: 16 }}
								value={this.state.inputValue}
								onChange={this.onChange}
							/>
						</Col>
					</Row>
					<FormItem {...formItemLayout} label="Age: ">
						<InputNumber min={10} max={100} />
					</FormItem>
					<Dropdown overlay={menu}>
						<a className="ant-dropdown-link" href="#">
							Time on Monday <Icon type="down" />
						</a>
					</Dropdown>
					<InputTimeZone />
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
