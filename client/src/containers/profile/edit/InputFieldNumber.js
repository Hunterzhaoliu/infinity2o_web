import React, { Component } from 'react';
import * as profileActionCreators from '../../../actions/profile';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Input, Row, Col } from 'antd';
import ErrorMessage from './ErrorMessage';

class InputFieldNumber extends Component {
	onChangeAge = e => {
		this.props.onChangeAge(e.target.value);
	};

	renderValue(profile) {
		if (profile.newAge === undefined) {
			return profile.age;
		} else {
			return profile.newAge;
		}
	}

	render() {
		//console.log('this.props in InputFieldNumber', this.props);
		const { colorTheme, label, width, profile } = this.props;
		return (
			<div>
				<Row type="flex" justify="start" align="middle">
					<Col
						sm={{ span: 5 }}
						md={{ span: 5 }}
						lg={{ span: 5 }}
						xl={{ span: 5 }}
					>
						<h3
							style={{
								color: colorTheme.keyText5Color
							}}
						>
							{label}
						</h3>
					</Col>
					<Col
						sm={{ span: 3, offset: 1 }}
						md={{ span: 3, offset: 1 }}
						lg={{ span: 3, offset: 1 }}
						xl={{ span: 3, offset: 1 }}
					>
						<Input
							value={this.renderValue(profile)}
							onChange={this.onChangeAge}
							style={{
								width: width,
								borderColor: colorTheme.text9Color,
								background: colorTheme.text9Color,
								color: colorTheme.text5Color
							}}
						/>
					</Col>
				</Row>
				<ErrorMessage
					message="Between 13 & 125. If your close you should lie ;)"
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
		onChangeAge: newAge => {
			profileDispatchers.onChangeAge(newAge);
		}
	};
}

export default connect(mapStateToProps, mapDispatchToProps)(InputFieldNumber);
