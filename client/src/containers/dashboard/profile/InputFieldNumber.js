import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Input, InputNumber, Row, Col } from 'antd';

class InputFieldNumber extends Component {
	render() {
		//console.log('this.props in InputFieldNumber', this.props);
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
						sm={{ span: 3, offset: 1 }}
						md={{ span: 3, offset: 1 }}
						lg={{ span: 3, offset: 1 }}
						xl={{ span: 3, offset: 1 }}
					>
						<Input
							{...this.props.input}
							style={{
								width: this.props.width,
								borderColor: this.props.colorTheme.text7Color,
								background: this.props.colorTheme.text7Color,
								color: this.props.colorTheme.keyText3Color
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
