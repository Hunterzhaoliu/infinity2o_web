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
		const step1Src =
			'https://user-images.githubusercontent.com/24757872/38593521-5a2f113c-3d07-11e8-85dd-3a0acd7bce29.png';
		const step2 = `2) Save your profile`;
		const step2Src =
			'https://user-images.githubusercontent.com/24757872/38592192-3e8a8a30-3d00-11e8-9de9-7707bbc9b022.png';
		const step3 = `3) Answer Questions to Train your AI`;
		const step3Src =
			'https://user-images.githubusercontent.com/24757872/38593334-7a0e9974-3d06-11e8-8155-0876a2ad196e.png';
		const step4 = `4) Find your partner`;
		const step4Src =
			'https://user-images.githubusercontent.com/24757872/38592192-3e8a8a30-3d00-11e8-9de9-7707bbc9b022.png';
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
				<Row type="flex" justify="center">
					<Col
						sm={{ span: 13, offset: 0 }}
						md={{ span: 10, offset: 0 }}
						lg={{ span: 7, offset: 0 }}
						xl={{ span: 12, offset: 0 }}
					>
						<h2
							key="1"
							style={{
								color: colorTheme.text2Color
							}}
						>
							{step1}
						</h2>
					</Col>

					<Col
						sm={{ span: 13, offset: 0 }}
						md={{ span: 10, offset: 0 }}
						lg={{ span: 7, offset: 0 }}
						xl={{ span: 12, offset: 0 }}
					>
						<h2
							key="2"
							style={{
								color: colorTheme.text2Color
							}}
						>
							{step2}
						</h2>
					</Col>
				</Row>
				<Row type="flex" justify="center">
					<Col
						sm={{ span: 13, offset: 0 }}
						md={{ span: 10, offset: 0 }}
						lg={{ span: 7, offset: 0 }}
						xl={{ span: 12, offset: 0 }}
					>
						<img src={step1Src} alt="Image load error" />
					</Col>
					<Col
						sm={{ span: 13, offset: 0 }}
						md={{ span: 10, offset: 0 }}
						lg={{ span: 7, offset: 0 }}
						xl={{ span: 12, offset: 0 }}
					>
						<img src={step2Src} alt="Image load error" />
					</Col>
				</Row>
				<Row type="flex" justify="center">
					<Col
						sm={{ span: 13, offset: 0 }}
						md={{ span: 10, offset: 0 }}
						lg={{ span: 7, offset: 0 }}
						xl={{ span: 12, offset: 0 }}
					>
						<h2
							key="1"
							style={{
								color: colorTheme.text2Color
							}}
						>
							{step1}
						</h2>
					</Col>

					<Col
						sm={{ span: 13, offset: 0 }}
						md={{ span: 10, offset: 0 }}
						lg={{ span: 7, offset: 0 }}
						xl={{ span: 12, offset: 0 }}
					>
						<h2
							key="2"
							style={{
								color: colorTheme.text2Color
							}}
						>
							{step2}
						</h2>
					</Col>
				</Row>
				<Row type="flex" justify="center">
					<Col
						sm={{ span: 13, offset: 0 }}
						md={{ span: 10, offset: 0 }}
						lg={{ span: 7, offset: 0 }}
						xl={{ span: 12, offset: 0 }}
					>
						<img src={step1Src} alt="Image load error" />
					</Col>
					<Col
						sm={{ span: 13, offset: 0 }}
						md={{ span: 10, offset: 0 }}
						lg={{ span: 7, offset: 0 }}
						xl={{ span: 12, offset: 0 }}
					>
						<img src={step2Src} alt="Image load error" />
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
