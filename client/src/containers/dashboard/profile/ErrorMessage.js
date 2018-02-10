import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Row, Col } from 'antd';

class ErrorMessage extends Component {
	render() {
		return (
			<Row type="flex" justify="start" align="middle">
				<Col
					sm={{ span: 6 }}
					md={{ span: 6 }}
					lg={{ span: 6 }}
					xl={{ span: 6 }}
				/>
				<Col
					sm={{ span: 18 }}
					md={{ span: 18 }}
					lg={{ span: 18 }}
					xl={{ span: 18 }}
				>
					<div
						style={{
							marginBottom: '10px',
							color: this.props.colorTheme.keyText3Color
						}}
					>
						{this.props.meta.touched && this.props.meta.error}
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
		colorTheme: state.colorTheme,
		userInfo: state.auth.userInfo
	};
}

export default connect(mapStateToProps, null)(ErrorMessage);
