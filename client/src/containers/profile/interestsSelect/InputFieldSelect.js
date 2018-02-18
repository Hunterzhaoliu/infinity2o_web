import _ from 'lodash';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import optionFields from './optionFields';
import ErrorMessage from '../ErrorMessage';
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
		const {
			colorTheme,
			label,
			input,
			width,
			meta,
			placeholder
		} = this.props;
		const test = ['art', 'music'];

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
							placeholder={placeholder}
							defaultValue={test}
							onChange={input.onChange}
							onFocus={input.onFocus}
						>
							{this.renderOptions()}
						</Select>
					</Col>
				</Row>
				<ErrorMessage meta={meta} />
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
