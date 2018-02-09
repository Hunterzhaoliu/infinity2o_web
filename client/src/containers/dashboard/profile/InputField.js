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
						sm={{ span: 6 }}
						md={{ span: 6 }}
						lg={{ span: 6 }}
						xl={{ span: 6 }}
					>
						<label
							style={{
								color: this.props.colorTheme.keyText6Color
							}}
						>
							{this.props.label}
						</label>
					</Col>
					<Col
						sm={{ span: 18 }}
						md={{ span: 18 }}
						lg={{ span: 18 }}
						xl={{ span: 18 }}
					>
						<Input
							{...this.props.input}
							style={{
								width: this.props.width,
								borderColor: this.props.colorTheme.text8Color,
								background: this.props.colorTheme.text8Color,
								color: this.props.colorTheme.keyText4Color
							}}
						/>
					</Col>
				</Row>
				<Row type="flex" justify="start" align="middle">
					<Col
						sm={{ span: 4 }}
						md={{ span: 4 }}
						lg={{ span: 4 }}
						xl={{ span: 4 }}
					/>
					<Col
						sm={{ span: 20 }}
						md={{ span: 20 }}
						lg={{ span: 20 }}
						xl={{ span: 20 }}
					>
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
