import React, { Component } from 'react';
import { connect } from 'react-redux';
import { TreeSelect, Row, Col } from 'antd';
import timeZones from './timeZones';
import ErrorMessage from './ErrorMessage';

class InputTimeZone extends Component {
	render() {
		//console.log('this.props in InputTimeZone', this.props);
		// <input onBlur={input.onBlur} onChange={input.onChange} />
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
								color: this.props.colorTheme.keyText5Color
							}}
						>
							{this.props.label}
						</h3>
					</Col>
					<Col
						sm={{ span: 18, offset: 1 }}
						md={{ span: 18, offset: 1 }}
						lg={{ span: 18, offset: 1 }}
						xl={{ span: 18, offset: 1 }}
					>
						<TreeSelect
							{...this.props.input}
							value={this.props.input.value || []} // requires value to be an array
							style={{ width: this.props.width }}
							dropdownStyle={{ maxHeight: 400, overflow: 'auto' }}
							treeData={timeZones}
							placeholder="Time Zone?"
						/>
					</Col>
				</Row>
				<ErrorMessage meta={this.props.meta} />
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
		userInfo: state.auth.userInfo
	};
}

export default connect(mapStateToProps, null)(InputTimeZone);
