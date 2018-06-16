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
		const { colorTheme, message, hasError } = this.props;
		return (
			<Row type="flex" justify="start" align="middle">
				<Col
					sm={{ span: 7 }}
					md={{ span: 7 }}
					lg={{ span: 7 }}
					xl={{ span: 5 }}
				/>
				<Col
					sm={{ span: 17 }}
					md={{ span: 17 }}
					lg={{ span: 17 }}
					xl={{ span: 19 }}
				>
					<div
						style={{
							marginBottom: '10px',
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
