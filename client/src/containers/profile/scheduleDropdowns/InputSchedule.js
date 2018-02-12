import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Field } from 'redux-form';
import DayDropdown from './DayDropdown';
import { Row, Col } from 'antd';

class InputSchedule extends Component {
	render() {
		//console.log('this.props in InputSchedule', this.props);
		const { day } = this.props;
		return (
			<div>
				<Row type="flex" justify="space-between" align="middle">
					<Col span={24}>
						<Field
							name={day.value}
							day={day}
							component={DayDropdown}
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

export default connect(mapStateToProps, null)(InputSchedule);
