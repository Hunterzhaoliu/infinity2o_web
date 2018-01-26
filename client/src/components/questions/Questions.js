import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Layout } from 'antd';
const { Content } = Layout;

class Questions extends Component {
	render() {
		return (
			<Content
				style={{
					textAlign: 'center',
					padding: '100px 50px 81px', // top left&right bottom
					minHeight: 82,
					background: this.props.colorTheme.backgroundColor
				}}
			>
				<h1 key="0" style={{ color: this.props.colorTheme.text1Color }}>
					Your Current Beliefs
				</h1>
				<h1 key="1" style={{ color: this.props.colorTheme.text1Color }}>
					Hottest Revoted Questions
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

export default connect(mapStateToProps, null)(Questions);
