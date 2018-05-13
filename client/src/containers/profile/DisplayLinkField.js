import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Row, Col, Button } from 'antd';

class DisplayLinkField extends Component {
	renderValue(label, value) {
		const { colorTheme } = this.props;
		if (value !== undefined && value !== null) {
			return (
				<Button
					style={{
						borderColor: colorTheme.text8Color,
						background: colorTheme.text8Color,
						color: colorTheme.keyText4Color
					}}
				>
					<a target="_blank" href={value}>
						{value}
					</a>
				</Button>
			);
		} else {
			return;
		}
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
					<h3
						style={{
							color: colorTheme.text4Color
						}}
					>
						{label}
					</h3>
				</Col>
				<Col
					sm={{ span: 18, offset: 1 }}
					md={{ span: 19, offset: 1 }}
					lg={{ span: 20, offset: 1 }}
					xl={{ span: 21, offset: 1 }}
				>
					<h3
						style={{
							color: colorTheme.text2Color
						}}
					>
						{this.renderValue(label, value)}
					</h3>
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
