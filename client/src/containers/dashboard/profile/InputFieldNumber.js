import React, { Component } from 'react';
import { connect } from 'react-redux';
import { InputNumber, Row, Col } from 'antd';

class InputFieldNumber extends Component {
	render() {
		//console.log('this.props in InputFieldNumber', this.props);
		return (
			<div>
				<Row type="flex" justify="start" align="middle">
					<Col
						sm={{ span: 9 }}
						md={{ span: 9 }}
						lg={{ span: 9 }}
						xl={{ span: 9 }}
					>
						<label
							style={{
								color: this.props.colorTheme.keyText2Color
							}}
						>
							{this.props.label}
						</label>
					</Col>
					<Col
						sm={{ span: 4, offset: 11 }}
						md={{ span: 4, offset: 11 }}
						lg={{ span: 4, offset: 11 }}
						xl={{ span: 4, offset: 11 }}
					>
						<InputNumber
							min={13}
							max={125}
							defaultValue={this.props.defaultValue}
							style={{
								width: this.props.width,
								borderColor: this.props.colorTheme
									.keyText6Color,
								color: this.props.colorTheme.keyText2Color
							}}
						/>
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

export default connect(mapStateToProps, null)(InputFieldNumber);
