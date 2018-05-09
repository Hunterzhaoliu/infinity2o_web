import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Input, Row, Col } from 'antd';
import ErrorMessage from './ErrorMessage';

class InputField extends Component {
	onChange = e => {
		const { onChange } = this.props;
		onChange(e.target.value);
	};

	render() {
		//console.log('InputField this.props = ', this.props);
		const {
			value,
			colorTheme,
			label,
			width,
			errorMessage,
			hasError
		} = this.props;

		return (
			<div>
				<Row type="flex" justify="start" align="middle">
					<Col
						sm={{ span: 6 }}
						md={{ span: 6 }}
						lg={{ span: 6 }}
						xl={{ span: 4 }}
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
						sm={{ span: 16, offset: 1 }}
						md={{ span: 17, offset: 1 }}
						lg={{ span: 17, offset: 1 }}
						xl={{ span: 19, offset: 1 }}
					>
						<Input
							value={value}
							onChange={this.onChange}
							style={{
								width: width,
								color: colorTheme.text2Color,
								borderColor: colorTheme.text8Color,
								backgroundColor: colorTheme.text8Color
							}}
						/>
					</Col>
				</Row>
				<ErrorMessage message={errorMessage} hasError={hasError} />
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
		colorTheme: state.colorTheme,
		profile: state.profile
	};
}

export default connect(mapStateToProps, null)(InputField);
