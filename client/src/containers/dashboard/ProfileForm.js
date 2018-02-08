import React, { Component } from 'react';
import { connect } from 'react-redux';
import { reduxForm, Field } from 'redux-form';
import InputField from './InputField';
import {
	Layout,
	Row,
	Form,
	Select,
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
		checkedList: [],
		indeterminate: true,
		checkAll: false,
		visible: false
	};
	onSchedChange = checkedList => {
		this.setState({
			checkedList,
			indeterminate:
				!!checkedList.length && checkedList.length < plainOptions.length,
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
							onChange={this.onSchedChange}
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
							<Option value="Architecture">Architecture</Option>
							<Option value="Art & Culture">Art & Culture</Option>
							<Option value="Biology & Life Sciences">
								Biology & Life Sciences
							</Option>
							<Option value="Business & Management">
								Business & Management
							</Option>
							<Option value="Chemistry">Computer Science</Option>
							<Option value="Communication">Communication</Option>
							<Option value="Computer Science">Computer Science</Option>
							<Option value="Data Analysis & Statistics">
								Data Analysis & Statistics
							</Option>
							<Option value="Design">Design</Option>
							<Option value="Economics & Finance">Economics & Finance</Option>
							<Option value="Education & Teacher Training">
								Education & Teacher Training
							</Option>
							<Option value="Electronics">Electronics</Option>
							<Option value="Energy & Earth Sciences">
								Energy & Earth Sciences
							</Option>
							<Option value="Engineering">Engineering</Option>
							<Option value="Environmental Studies">
								Environmental Studies
							</Option>
							<Option value="Ethics">Ethics</Option>
							<Option value="Food & Nurtition">Food & Nurtition</Option>
							<Option value="Health & Safety">Health & Safety</Option>
							<Option value="History">History</Option>
							<Option value="Humanities">Humanities</Option>
							<Option value="Language & Literature">
								Language & Literature
							</Option>
							<Option value="Law">Law</Option>
							<Option value="Math">Math</Option>
							<Option value="Medicine">Medicine</Option>
							<Option value="Music">Music</Option>
							<Option value="Philosophy & Ethics">Philosophy & Ethics</Option>
							<Option value="Physics">Physics</Option>
							<Option value="Science">Science</Option>
							<Option value="Social Sciences">Social Sciences</Option>
						</Select>
					</FormItem>
					<FormItem {...formItemLayout} label="Age: ">
						<InputNumber min={10} max={100} />
					</FormItem>
					<Dropdown
						overlay={menu}
						onVisibleChange={this.handleVisibleChange}
						visible={this.state.visible}
					>
						<a className="ant-dropdown-link" href="#">
							Time on Monday <Icon type="down" />
						</a>
					</Dropdown>
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
	form: 'ProfileForm'
})(ProfileForm);
