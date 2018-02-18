import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Input, Row, Col } from 'antd';

class InputFieldNumber extends Component {
	render() {
		//console.log('this.props in InputFieldNumber', this.props);
		const { colorTheme, label, width, defaultValue } = this.props;
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
						sm={{ span: 3, offset: 1 }}
						md={{ span: 3, offset: 1 }}
						lg={{ span: 3, offset: 1 }}
						xl={{ span: 3, offset: 1 }}
					>
						<Input
							defaultValue={defaultValue}
							// onChange={input.onChange}
							// onFocus={input.onFocus}
							style={{
								width: width,
								borderColor: colorTheme.text7Color,
								background: colorTheme.text7Color,
								color: colorTheme.text3Color
							}}
						/>
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

export default connect(mapStateToProps, null)(InputFieldNumber);
