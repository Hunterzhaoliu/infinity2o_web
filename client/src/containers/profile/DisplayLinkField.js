import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Row, Col, Button } from 'antd';

class DisplayLinkField extends Component {
	renderValue(label, value) {
		const { colorTheme } = this.props;
	}

	render() {
		const { colorTheme, label, value } = this.props;
		return (
			<Row type="flex" justify="start" align="middle">
				<Col
					sm={{ span: 5 }}
					md={{ span: 4 }}
					lg={{ span: 3 }}
					xl={{ span: 2 }}
				>
					<h4
						style={{
							color: colorTheme.text4Color
						}}
					>
						{label}
					</h4>
				</Col>
				<Col
					sm={{ span: 18, offset: 1 }}
					md={{ span: 19, offset: 1 }}
					lg={{ span: 20, offset: 1 }}
					xl={{ span: 21, offset: 1 }}
				>
					<h4
						style={{
							color: colorTheme.text2Color
						}}
					>
						{this.renderValue(label, value)}
					</h4>
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

export default connect(mapStateToProps, null)(DisplayLinkField);
