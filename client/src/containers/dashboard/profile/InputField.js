import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Input, Row, Col } from 'antd';

class InputField extends Component {
	render() {
		//console.log('this.props in InputField', this.props);
		return (
			<div>
				<Row type="flex" justify="start" align="middle">
					<Col
						sm={{ span: 4 }}
						md={{ span: 4 }}
						lg={{ span: 4 }}
						xl={{ span: 4 }}
					>
						<h3
							style={{
								color: this.props.colorTheme.keyText5Color
							}}
						>
							{this.props.label}
						</h3>
					</Col>
					<Col
						sm={{ span: 19, offset: 1 }}
						md={{ span: 19, offset: 1 }}
						lg={{ span: 19, offset: 1 }}
						xl={{ span: 19, offset: 1 }}
					>
						<Input
							{...this.props.input}
							style={{
								width: this.props.width,
								borderColor: this.props.colorTheme.text7Color,
								background: this.props.colorTheme.text7Color,
								color: this.props.colorTheme.text3Color
							}}
						/>
					</Col>
				</Row>
				<Row type="flex" justify="start" align="middle">
					<Col
						sm={{ span: 5 }}
						md={{ span: 5 }}
						lg={{ span: 5 }}
						xl={{ span: 5 }}
					/>
					<Col
						sm={{ span: 19 }}
						md={{ span: 19 }}
						lg={{ span: 19 }}
						xl={{ span: 19 }}
					>
						<div
							style={{
								marginBottom: '5px',
								color: this.props.colorTheme.keyText3Color
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
