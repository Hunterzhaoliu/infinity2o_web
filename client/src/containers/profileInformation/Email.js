import React, { Component } from 'react';
// import { bindActionCreators } from "redux";
import { connect } from 'react-redux';
import { Row, Col } from 'antd';
import DisplayField from '../profile/DisplayField';

class Email extends Component {
	render() {
		const { value } = this.props;
		return (
			<Row type="flex" justify="start" align="middle">
				<Col span={1}>
					<img
						alt="Email: "
						style={{
							width: '35px',
							padding: '0px 0px 0px 12px'
						}}
						src="https://user-images.githubusercontent.com/24757872/40867452-d7a6feaa-65c9-11e8-849f-9d144103b0c3.png"
					/>
				</Col>
				<Col
					span={23}
					style={{
						padding: '4px 0px 0px 20px' // top right bottom left
					}}
				>
					<DisplayField label="E-mail: " value={value} />
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
	return {};
}

/*
So we have a state and a UI(with props).
This function gives the UI the functions it will need to be called.
*/
function mapDispatchToProps(dispatch) {
	return {};
}

export default connect(mapStateToProps, mapDispatchToProps)(Email);
