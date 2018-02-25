import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as indexActionCreators from '../../actions/index';
import * as colorThemeActionCreators from '../../actions/colorTheme';
import { bindActionCreators } from 'redux';
import { Button, Card, Col, Layout, Row } from 'antd';
const { Content } = Layout;

class InputVote extends Component {
	render() {
		//console.log('this.props in InputVote.js', this.props);
		const { colorTheme } = this.props;
		let testTitle = 'Is there free will?';
		return (
			<Content
				style={{
					padding: '25px 50px 25px', // top left&right bottom
					background: colorTheme.backgroundColor
				}}
			>
				<Row gutter={36}>
					<Col span={12}>
						<Card title={testTitle}>
							<Button ghost type="primary">
								Answer
							</Button>
						</Card>
					</Col>
					<Col span={12}>
						<Card title="Card title" bordered={false}>
							Card content
						</Card>
					</Col>
				</Row>
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

/*
So we have a state and a UI(with props).
This function gives the UI the functions it will need to be called.
*/
function mapDispatchToProps(dispatch) {
	const indexDispatchers = bindActionCreators(indexActionCreators, dispatch);

	const colorThemeDispatchers = bindActionCreators(
		colorThemeActionCreators,
		dispatch
	);

	return {
		fetchUserProfile: () => {
			indexDispatchers.fetchUserProfile();
		},
		onVote: () => {
			colorThemeDispatchers.onVote();
		}
	};
}

export default connect(mapStateToProps, mapDispatchToProps)(InputVote);
