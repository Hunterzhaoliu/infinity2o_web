import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Input, Row, Col } from 'antd';
import ErrorMessage from './ErrorMessage';

class InputField extends Component {
	render() {
		//console.log('this.props in InputField', this.props);
		const {
			colorTheme,
			label,
			input,
			width,
			meta,
			databaseValue
		} = this.props;
		return (
			<div>
				<Row type="flex" justify="start" align="middle">
					<Col md={{ span: 5 }}>
						<h3
							style={{
								color: colorTheme.keyText5Color
							}}
						>
							{label}
						</h3>
					</Col>
					<Col md={{ span: 18, offset: 1 }}>
						<Input
							defaultValue={databaseValue}
							{...input}
							style={{
								width: width,
								borderColor: colorTheme.text7Color,
								background: colorTheme.text7Color,
								color: colorTheme.text3Color
							}}
						/>
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

export default connect(mapStateToProps, null)(InputField);
