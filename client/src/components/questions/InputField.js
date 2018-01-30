import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Input, Row, Col } from 'antd';

class InputField extends Component {
	render() {
		//console.log('this.props in InputField', this.props);
		return (
			<div>
				<Row type="flex" justify="start" align="middle">
					<Col span={4}>
						<label
							style={{
								color: this.props.colorTheme.text1Color
							}}
						>
							{this.props.label}
						</label>
					</Col>
					<Col span={20}>
						<Input
							{...this.props.input}
							style={{
								width: 500,
								borderColor: this.props.colorTheme.text4Color,
								background: this.props.colorTheme.text4Color,
								color: this.props.colorTheme.text1Color
							}}
						/>
					</Col>
				</Row>
				<Row type="flex" justify="start" align="middle">
					<Col span={4}>
						<label />
					</Col>
					<Col span={20}>
						<div
							style={{
								marginBottom: '5px',
								color: this.props.colorTheme.key
							}}
						>
							{this.props.meta.touched && this.props.meta.error}
						</div>
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

export default connect(mapStateToProps, null)(InputField);
