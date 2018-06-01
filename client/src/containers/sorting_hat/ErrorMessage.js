import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Row, Col } from 'antd';

class ErrorMessage extends Component {
	renderMessage(hasError, message) {
		if (hasError) {
			return message;
		} else {
			return;
		}
	}
	render() {
		//console.log('ErrorMessage this.props = ', this.props);
		const { colorTheme, message, hasError } = this.props;
		return (
			<Row type="flex" justify="start" align="middle">
				<Col
					sm={{ span: 5 }}
					md={{ span: 5 }}
					lg={{ span: 5 }}
					xl={{ span: 3 }}
				/>
				<Col
					sm={{ span: 19 }}
					md={{ span: 19 }}
					lg={{ span: 19 }}
					xl={{ span: 21 }}
				>
					<div
						style={{
							color: colorTheme.keyText1Color
						}}
					>
						{this.renderMessage(hasError, message)}
					</div>
				</Col>
			</Row>
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

export default connect(mapStateToProps, null)(ErrorMessage);
