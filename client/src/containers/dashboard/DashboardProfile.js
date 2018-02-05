import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Layout } from 'antd';
const { Content } = Layout;

class DashboardProfile extends Component {
	render() {
		// console.log('this.props in DashboardProfile.js', this.props);
		return (
			<Content
				style={{
					textAlign: 'center',
					padding: '100px 50px 81px', // top left&right bottom
					background: this.props.colorTheme.backgroundColor
				}}
			>
				<h1 key="0" style={{ color: this.props.colorTheme.text1Color }}>
					DashboardProfile
				</h1>
			</Content>
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

export default connect(mapStateToProps, null)(DashboardProfile);
