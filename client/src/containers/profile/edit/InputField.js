import React, { Component } from 'react';
import * as profileActionCreators from '../../../actions/profile';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Input, Row, Col } from 'antd';
import ErrorMessage from './ErrorMessage';

class InputField extends Component {
	onChangeName = e => {
		this.props.onChangeName(e.target.value);
	};

	render() {
		//console.log('InputField this.props = ', this.props);
		const { colorTheme, label, width, profile } = this.props;

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
								color: colorTheme.text6Color
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
							value={profile.newName}
							onChange={this.onChangeName}
							style={{
								width: width,
								color: colorTheme.text4Color
							}}
						/>
					</Col>
				</Row>
				<ErrorMessage
					message="Cool name! But we need 1 to 30 valid letters"
					hasError={profile.hasNameError}
				/>
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

/*
So we have a state and a UI(with props).
This function gives the UI the functions it will need to be called.
*/
function mapDispatchToProps(dispatch) {
	const profileDispatchers = bindActionCreators(
		profileActionCreators,
		dispatch
	);

	return {
		onChangeName: newName => {
			profileDispatchers.onChangeName(newName);
		}
	};
}

export default connect(mapStateToProps, mapDispatchToProps)(InputField);
