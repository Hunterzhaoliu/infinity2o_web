import React, { Component } from 'react';
import * as profileActionCreators from '../../../../actions/profile';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { TreeSelect, Row, Col } from 'antd';
import timeZones from './timeZones';
import ErrorMessage from '../ErrorMessage';

class InputTimeZone extends Component {
	onChangeTimeZone = e => {
		this.props.onChangeTimeZone(e);
	};

	render() {
		//console.log('InputTimeZone this.props = ', this.props);
		// <input onBlur={input.onBlur} onChange={input.onChange} />
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
						<TreeSelect
							style={{
								width: width
								// borderColor: colorTheme.text8Color,
								// background: colorTheme.text8Color,
								// color: colorTheme.text4Color
							}}
							dropdownStyle={{ maxHeight: 400, overflow: 'auto' }}
							value={profile.newTimeZone}
							onChange={this.onChangeTimeZone}
							treeData={timeZones}
						/>
					</Col>
				</Row>
				<ErrorMessage
					message="Need a time zone instead of a country silly"
					hasError={profile.hasTimeZoneError}
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

function mapDispatchToProps(dispatch) {
	const profileDispatchers = bindActionCreators(
		profileActionCreators,
		dispatch
	);

	return {
		onChangeTimeZone: newTimeZone => {
			profileDispatchers.onChangeTimeZone(newTimeZone);
		}
	};
}

export default connect(mapStateToProps, mapDispatchToProps)(InputTimeZone);
