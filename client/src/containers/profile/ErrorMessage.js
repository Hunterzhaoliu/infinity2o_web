import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Row, Col } from 'antd';

class ErrorMessage extends Component {
	render() {
		//console.log('ErrorMessage this.props = ', this.props);
		const { colorTheme, meta } = this.props;
		return (
			<Row type="flex" justify="start" align="middle">
				<Col md={{ span: 6 }} />
				<Col md={{ span: 18 }}>
					<div
						style={{
							marginBottom: '10px',
							color: colorTheme.keyText1Color
						}}
					>
						{meta.visited && meta.error}
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
