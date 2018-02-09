import _ from 'lodash';
import React, { Component } from 'react';
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

	render() {
		//console.log('this.props in InputFieldSelect', this.props);
		return (
			<div>
				<Row type="flex" justify="start" align="middle">
					<Col
						sm={{ span: 4 }}
						md={{ span: 4 }}
						lg={{ span: 4 }}
						xl={{ span: 4 }}
					>
						<label
							style={{
								color: this.props.colorTheme.keyText5Color
							}}
						>
							{this.props.label}
						</label>
					</Col>
					<Col
						sm={{ span: 19, offset: 1 }}
						md={{ span: 19, offset: 1 }}
						lg={{ span: 19, offset: 1 }}
						xl={{ span: 19, offset: 1 }}
					>
						<Select
							mode="multiple"
							placeholder={this.props.placeholder}
							style={{
								width: this.props.width,
								borderColor: this.props.colorTheme.text6Color
							}}
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
		colorTheme: state.colorTheme
	};
}

export default connect(mapStateToProps, null)(InputFieldSelect);
