import React, { Component } from 'react';
import { connect } from 'react-redux';
import { GREY_8, GREY_4, GREY_3, GREY_2 } from '../styles/ColorConstants';
import { Button, Row, Col, Card, Avatar } from 'antd';
import LinkedIn from '../profileInformation/LinkedIn';
import Github from '../profileInformation/Github';
import Interests from '../profileInformation/Interests';
import TimeZone from '../profileInformation/TimeZone';

class MatchCards extends Component {
	renderMatchTotalVotes(totalUserVotes) {
		const { colorTheme, loggedInState } = this.props;
		let textColor = colorTheme.text3Color;
		if (loggedInState === 'not_logged_in') {
			textColor = GREY_3;
		}

		let voteDescription;
		if (totalUserVotes <= 1) {
			voteDescription = 'total vote';
		} else {
			voteDescription = 'total votes';
		}
		return (
			<Row type="flex" justify="center" align="middle">
				<Col>
					<h3
						style={{
							color: textColor
						}}
					>
						{totalUserVotes} {voteDescription}
					</h3>
				</Col>
			</Row>
		);
	}

	renderMatchPicture(imageUrl) {
		if (imageUrl !== undefined) {
			return (
				<Row
					style={{ padding: '5px 0px 0px 0px' }}
					type="flex"
					justify="center"
					align="middle"
				>
					<Col>
						<Avatar
							style={{
								width: 75,
								height: 75
							}}
							shape="circle"
							src={imageUrl}
						/>
					</Col>
				</Row>
			);
		} else {
			return <div />;
		}
	}

	render() {
		const { match, history, colorTheme, loggedInState } = this.props;

		if (loggedInState === 'not_logged_in') {
			return (
				<Row type="flex" justify="center" align="top">
					<Col>
						<Card
							hoverable={true}
							borderded="false"
							loading={false}
							style={{
								width: '400px',
								borderColor: GREY_8,
								background: GREY_8
							}}
						>
							<Row type="flex" justify="center" align="middle">
								<Col>
									<h2
										style={{
											color: GREY_2
										}}
									>
										Harry Potter
									</h2>
								</Col>
								<Col>
									<h2
										style={{
											color: GREY_4
										}}
									>
										{', '}
										38
									</h2>
								</Col>
							</Row>
							{this.renderMatchTotalVotes(314)}
							<Row type="flex" justify="center" align="middle">
								<Col>
									<LinkedIn
										value={'https://bit.ly/2y6EcwX'}
									/>
								</Col>
								<Col>
									<Github
										value={
											'https://github.com/harrypotter4real'
										}
									/>
								</Col>
							</Row>
							<Row style={{ padding: '10px 0px 0px 0px' }}>
								<Interests
									interests={[
										'artificial_intelligence',
										'computer_science',
										'physics',
										'philosophy'
									]}
								/>
							</Row>
							<Row>
								<TimeZone
									value={['united_states', 'US-Eastern']}
								/>
							</Row>
							{this.renderMatchPicture('https://bit.ly/2JLyOE1')}
						</Card>
					</Col>
				</Row>
			);
		} else {
			return (
				<Row type="flex" justify="center" align="top">
					<Col>
						<Card
							hoverable={true}
							borderded="false"
							loading={false}
							style={{
								width: '400px',
								color: colorTheme.text1Color,
								borderColor: colorTheme.text8Color,
								background: colorTheme.text8Color
							}}
						>
							<Row type="flex" justify="center" align="middle">
								<Col>
									<h2
										style={{
											color: colorTheme.keyText6Color
										}}
									>
										{match.name}
									</h2>
								</Col>
								<Col>
									<h2
										style={{
											color: colorTheme.text6Color
										}}
									>
										{', '}
										{match.age}
									</h2>
								</Col>
							</Row>
							{this.renderMatchTotalVotes(match.totalUserVotes)}
							<Row type="flex" justify="center" align="middle">
								<Col>
									<LinkedIn
										value={match.linkedInPublicProfileUrl}
									/>
								</Col>
								<Col>
									<Github
										value={match.githubPublicProfileUrl}
									/>
								</Col>
							</Row>
							<Interests interests={match.interests} />
							<TimeZone value={match.timeZone} />
							{this.renderMatchPicture(match.imageUrl)}
							<Row
								style={{ padding: '8px 0px 0px 0px' }}
								type="flex"
								justify="space-between"
								align="top"
							>
								<Col span={11}>
									<Button
										style={{
											borderColor: colorTheme.text7Color,
											background: colorTheme.text7Color,
											color: colorTheme.text2Color
										}}
										onClick={e => this.onNextMatch()}
									>
										Next
									</Button>
								</Col>
								<Col span={11}>
									<Button
										style={{
											borderColor:
												colorTheme.keyText7Color,
											background:
												colorTheme.keyText7Color,
											color: colorTheme.text1Color
										}}
										onClick={e =>
											this.onStartConversation(
												history,
												match.name,
												match.id
											)
										}
									>
										Say Hi
									</Button>
								</Col>
							</Row>
						</Card>
					</Col>
				</Row>
			);
		}
	}
}

/*
So we have a state and a UI(with props).
This function gives the UI the parts of the state it will need to display.
*/
function mapStateToProps(state) {
	return {
		colorTheme: state.colorTheme,
		loggedInState: state.auth.loggedInState
	};
}

export default connect(mapStateToProps, null)(MatchCards);
