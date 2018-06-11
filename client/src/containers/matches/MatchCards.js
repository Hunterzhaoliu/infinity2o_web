import React, { Component } from 'react';
import { connect } from 'react-redux';
import {} from '../styles/ColorConstants';
import { Button, Row, Col, Card, Avatar } from 'antd';
import LinkedIn from '../profileInformation/LinkedIn';
import Github from '../profileInformation/Github';
import Interests from '../profileInformation/Interests';
import TimeZone from '../profileInformation/TimeZone';

class MatchCards extends Component {
	renderMatchTotalVotes(totalUserVotes) {
		const { colorTheme } = this.props;
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
							//fontSize: 12,
							color: colorTheme.text3Color
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
										Bruce Wayne
									</h2>
								</Col>
								<Col>
									<h2
										style={{
											color: colorTheme.text6Color
										}}
									>
										{', '}
										42
									</h2>
								</Col>
							</Row>
							{this.renderMatchTotalVotes(314)}
							<Row type="flex" justify="center" align="middle">
								<Col>
									<LinkedIn
										value={'https://bit.ly/2l6cuqS'}
									/>
								</Col>
								<Col>
									<Github
										value={
											'https://github.com/brucewayne4real'
										}
									/>
								</Col>
							</Row>
							<Row style={{ padding: '10px 0px 0px 0px' }}>
								<Interests value={'artificial_intelligence'} />
							</Row>
							<Row>
								<TimeZone value={'US-Eastern'} />
							</Row>
							{this.renderMatchPicture(
								'http://images6.fanpop.com/image/photos/32400000/Bruce-Wayne-bruce-wayne-32411252-967-1450.jpg'
							)}
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
							<Row style={{ padding: '10px 0px 0px 0px' }}>
								<Interests value={match.interests} />
							</Row>
							<Row>
								<TimeZone value={match.timeZone} />
							</Row>
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
