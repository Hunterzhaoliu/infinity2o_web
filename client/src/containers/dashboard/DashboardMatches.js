import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Layout, Carousel } from 'antd';
const { Content } = Layout;

class DashboardMatches extends Component {
	render() {
		// console.log('this.props in DashboardMatches.js', this.props);
		return (
			<Content
				style={{
					textAlign: 'center',
					padding: '100px 50px 81px', // top left&right bottom
					background: this.props.colorTheme.backgroundColor
				}}
			>
				<h1 key="0" style={{ color: this.props.colorTheme.text1Color }}>
					Here are 2 matches our AI has selected for you.
				</h1>
				<h2 key="0" style={{ color: this.props.colorTheme.text2Color }}>
					Teach our AI which study partner you prefer by swapping out
					the partner you don't want.
				</h2>
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

export default connect(mapStateToProps, null)(DashboardMatches);
