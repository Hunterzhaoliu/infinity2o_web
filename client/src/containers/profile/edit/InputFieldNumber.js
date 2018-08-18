import React, { Component } from 'react';
import * as profileActionCreators from '../../../actions/profile/profile';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Input, Row, Col } from 'antd';
import ErrorMessage from './ErrorMessage';

class InputFieldNumber extends Component {
	onChangeAge = e => {
		this.props.onChangeAge(e.target.value);
	};

	render() {
		//console.log('this.props in InputFieldNumber', this.props);
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
							value={profile.age}
							onChange={this.onChangeAge}
							style={{
								width: width,
								color: colorTheme.text2Color,
								borderColor: colorTheme.text8Color,
								backgroundColor: colorTheme.text8Color
							}}
						/>
					</Col>
				</Row>
				<ErrorMessage
					message="Between 13 & 125."
					hasError={profile.hasAgeError}
				/>
			</div>
		);
	}
}

/*
So we have a state and a UI(with props).
This function gives the UI the functions it will need to be called.
*/

function mapStateToProps(state) {
	return {
		colorTheme: state.colorTheme,
		profile: state.profile
	};
}

function mapDispatchToProps(dispatch) {
	const profileDispatchers = bindActionCreators(
		profileActionCreators,
		dispatch
	);

	return {
		saveProfile: values => {
			profileDispatchers.saveProfile(values);
		},
		onChangeAge: e => {
			profileDispatchers.onChangeAge(e);
		}
	};
}

export default connect(mapStateToProps, mapDispatchToProps)(InputFieldNumber);
