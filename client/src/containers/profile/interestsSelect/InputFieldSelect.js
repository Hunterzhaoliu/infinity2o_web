import _ from 'lodash';
import React, { Component } from 'react';
import * as profileActionCreators from '../../../actions/profile';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import optionFields from './optionFields';
import { Row, Col, Select } from 'antd';
const { Option } = Select;

class InputFieldSelect extends Component {
	renderOptions() {
		return _.map(optionFields, option => {
			return (
				<Option value={option.value} key={option.value}>
					{option.name}
				</Option>
			);
		});
	}

	onChangeInterests = e => {
		this.props.onChangeInterests(e);
	};

	renderValue(profile) {
		if (profile.newInterests === undefined) {
			return profile.interests;
		} else {
			return profile.newInterests;
		}
	}

	render() {
		const { colorTheme, label, width, placeholder, profile } = this.props;
		return (
			<div>
				<Row type="flex" justify="start" align="middle">
					<Col
						sm={{ span: 5 }}
						md={{ span: 5 }}
						lg={{ span: 5 }}
						xl={{ span: 5 }}
					>
						<h3
							style={{
								color: colorTheme.keyText5Color
							}}
						>
							{label}
						</h3>
					</Col>
					<Col
						sm={{ span: 18, offset: 1 }}
						md={{ span: 18, offset: 1 }}
						lg={{ span: 18, offset: 1 }}
						xl={{ span: 18, offset: 1 }}
					>
						<Select
							mode="multiple"
							style={{
								width: width,
								borderColor: colorTheme.text6Color
							}}
							value={this.renderValue(profile)}
							onChange={this.onChangeInterests}
						>
							{this.renderOptions()}
						</Select>
					</Col>
				</Row>
			</div>
		);
	}
}

/*
So we have a state and a UI(with props).
This function gives the UI the parts of the state it will need to display.
*/
function mapStateToProps(state) {
	return {
		colorTheme: state.colorTheme,
		profile: state.profile
	};
}

function mapDispatchToProps(dispatch) {
	const profileDispatchers = bindActionCreators(
		profileActionCreators,
		dispatch
	);

	return {
		saveProfile: values => {
			profileDispatchers.saveProfile(values);
		},
		onChangeInterests: newInterests => {
			profileDispatchers.onChangeInterests(newInterests);
		}
	};
}

export default connect(mapStateToProps, mapDispatchToProps)(InputFieldSelect);
