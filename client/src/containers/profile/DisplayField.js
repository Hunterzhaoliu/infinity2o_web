import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Row, Col } from 'antd';

class DisplayField extends Component {
	renderValue(value) {
		if (
			value === null ||
			value === undefined ||
			typeof value === 'string' ||
			typeof value === 'number'
		) {
			return value;
		} else {
			// array
			let formattedValue = '';
			let i;
			for (i = 0; i < value.length; i++) {
				formattedValue += value[i] + ', ';
			}
			return formattedValue;
		}
	}

	render() {
		//console.log('this.props in DisplayField', this.props);
		const { colorTheme, label, value } = this.props;
		return (
			<div>
				<Row type="flex" justify="start" align="middle">
					<Col md={{ span: 5 }}>
						<h3
							style={{
								color: colorTheme.keyText6Color
							}}
						>
							{label}
						</h3>
					</Col>
					<Col md={{ span: 18, offset: 1 }}>
						<h3
							style={{
								color: colorTheme.text3Color
							}}
						>
							{this.renderValue(value)}
						</h3>
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

export default connect(mapStateToProps, null)(DisplayField);
