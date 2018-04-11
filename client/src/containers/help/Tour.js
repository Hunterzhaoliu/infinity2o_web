import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as colorThemeActions from '../../actions/colorTheme';
import { bindActionCreators } from 'redux';
import { Layout, Row, Col } from 'antd';
const { Content } = Layout;

class Tour extends Component {
	componentWillMount() {
		// run once before first render()

		this.props.onTour();
	}

	render() {
		const { colorTheme } = this.props;
		const welcome = `How do I use infinity2o?`;
		const step1 = `1) Start by editing your profile`;
		return (
			<Content
				style={{
					textAlign: 'center',
					padding: '100px 50px 50px', // top left&right bottom
					minHeight: 82,
					background: colorTheme.backgroundColor
				}}
			>
				<Row type="flex" justify="center">
					<Col
						sm={{ span: 13, offset: 0 }}
						md={{ span: 10, offset: 0 }}
						lg={{ span: 7, offset: 0 }}
						xl={{ span: 24, offset: 0 }}
					>
						<h1
							key="0"
							style={{
								color: colorTheme.text2Color
							}}
						>
							{welcome}
						</h1>
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
	const customHeaderDispatchers = bindActionCreators(
		colorThemeActions,
		dispatch
	);

	return {
		onTour: () => {
			customHeaderDispatchers.onTour();
		}
	};
}

export default connect(mapStateToProps, mapDispatchToProps)(Tour);
