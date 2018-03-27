import _ from 'lodash';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import matchesFields from './matchesFields';
import * as colorThemeActionCreators from '../../actions/colorTheme';
import { bindActionCreators } from 'redux';
import { Layout, Row, Col, Card, Button } from 'antd';
const { Content } = Layout;

class Matches extends Component {
	componentWillMount() {
		// run once before first render()
		this.props.onMatches();
	}

	renderMatches() {
		//console.log('in Matches.js this.props.matches = ', this.props.matches);
		const { current1DisplayedMatches } = this.props.matches;

		if (current1DisplayedMatches.length > 0) {
			return _.map(matchesFields, match => {
				return (
					<Col
						key={match.name}
						sm={{ span: 10 }}
						md={{ span: 11, offset: 0 }}
						lg={{ span: 9 }}
						xl={{ span: 7 }}
						style={{
							height: '50%'
						}}
					>
						<Row type="flex" justify="center" align="top">
							<Card
								hoverable={true}
								borderded="false"
								loading={false}
								style={{
									width: '260px',
									color: this.props.colorTheme.text1Color,
									borderColor: this.props.colorTheme
										.text8Color,
									background: this.props.colorTheme.text8Color
								}}
							>
								<h3
									style={{
										color: this.props.colorTheme.text1Color
									}}
								>
									{current1DisplayedMatches[0].name}
								</h3>
								<p
									style={{
										color: this.props.colorTheme.text3Color
									}}
								>
									Interests:{' '}
									{current1DisplayedMatches[0].interests}
								</p>
								<p
									style={{
										color: this.props.colorTheme.text3Color
									}}
								>
									Total User Votes:{' '}
									{current1DisplayedMatches[0].totalUserVotes}
								</p>
								<Row
									type="flex"
									justify="space-between"
									align="top"
								>
									<Col span={11}>
										<Button
											style={{
												borderColor: this.props
													.colorTheme.text6Color,
												background: this.props
													.colorTheme.text6Color,
												color: this.props.colorTheme
													.text2Color
											}}
										>
											Next
										</Button>
									</Col>
									<Col span={11}>
										<Button
											style={{
												borderColor: this.props
													.colorTheme.text6Color,
												background: this.props
													.colorTheme.text6Color,
												color: this.props.colorTheme
													.text2Color
											}}
										>
											Say Hi :)
										</Button>
									</Col>
								</Row>
							</Card>
						</Row>
					</Col>
				);
			});
		} else {
			return (
				<h3
					style={{
						color: this.props.colorTheme.text2Color
					}}
				>
					Head over to Train AI first then come back after 24 hours.
				</h3>
			);
		}
	}

	render() {
		return (
			<Content
				style={{
					textAlign: 'center',
					padding: '75px 50px 0px', // top left&right bottom
					background: this.props.colorTheme.backgroundColor
				}}
			>
				<h2
					key="1"
					style={{
						color: this.props.colorTheme.text3Color,
						padding: '0% 0% 5%'
					}}
				>
					Every 24 hours our AI generates the best partners for you.
				</h2>
				<Row type="flex" justify="space-between" align="top">
					<Col
						sm={{ span: 0 }}
						md={{ span: 1 }}
						lg={{ span: 3 }}
						xl={{ span: 5 }}
					/>
					{this.renderMatches()}
					<Col
						sm={{ span: 0 }}
						md={{ span: 1 }}
						lg={{ span: 3 }}
						xl={{ span: 5 }}
					/>
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
		colorTheme: state.colorTheme,
		matches: state.matches
	};
}

/*
So we have a state and a UI(with props).
This function gives the UI the functions it will need to be called.
*/
function mapDispatchToProps(dispatch) {
	const colorThemeDispatchers = bindActionCreators(
		colorThemeActionCreators,
		dispatch
	);

	return {
		onMatches: () => {
			colorThemeDispatchers.onMatches();
		}
	};
}

export default connect(mapStateToProps, mapDispatchToProps)(Matches);
