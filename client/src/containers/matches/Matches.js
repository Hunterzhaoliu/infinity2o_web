import _ from 'lodash';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import matchesFields from './matchesFields';
import { Layout, Row, Col, Card, Button, Icon } from 'antd';
const { Content } = Layout;

class Matches extends Component {
	renderMatches() {
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
								borderColor: this.props.colorTheme.text8Color,
								background: this.props.colorTheme.text8Color
							}}
							cover={
								<img
									style={{
										height: '260px',
										width: '260px'
									}}
									alt="example"
									src={match.profile_pic_src}
								/>
							}
						>
							<h3
								style={{
									color: this.props.colorTheme.text1Color
								}}
							>
								{match.name}
							</h3>
							<p
								style={{
									color: this.props.colorTheme.text3Color
								}}
							>
								Learning interests: {match.learning_interests}
							</p>
							<p
								style={{
									color: this.props.colorTheme.text3Color
								}}
							>
								Class interest: {match.class_interests}
							</p>
							<p
								style={{
									color: this.props.colorTheme.text3Color
								}}
							>
								# of hours/week free: {match.num_hrs_week_free}
							</p>
							<p
								style={{
									color: this.props.colorTheme.text3Color
								}}
							>
								Resume: {match.resume}
							</p>
							<Row type="flex" justify="space-between" align="top">
								<Col span={11}>
									<Button
										style={{
											borderColor: this.props.colorTheme.key,
											background: this.props.colorTheme.key,
											color: this.props.colorTheme.text2Color
										}}
									>
										Swap
										<Icon type="swap" />
									</Button>
								</Col>
								<Col span={11}>
									<Button
										style={{
											borderColor: this.props.colorTheme.key,
											background: this.props.colorTheme.key,
											color: this.props.colorTheme.text2Color
										}}
									>
										Say Hi
										<Icon type="message" />
									</Button>
								</Col>
							</Row>
						</Card>
					</Row>
				</Col>
			);
		});
	}

	render() {
		// console.log('this.props in Matches.js', this.props);
		return (
			<Content
				style={{
					textAlign: 'center',
					padding: '100px 50px 50px', // top left&right bottom
					background: this.props.colorTheme.backgroundColor
				}}
			>
				<h1 key="0" style={{ color: this.props.colorTheme.text4Color }}>
					Here are 2 matches our AI has selected for you.
				</h1>
				<h2
					key="1"
					style={{
						color: this.props.colorTheme.text5Color,
						padding: '0% 0% 5%'
					}}
				>
					Teach our AI which study partner you prefer by swapping out the
					partner you dont want.
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
		colorTheme: state.colorTheme
	};
}

export default connect(mapStateToProps, null)(Matches);
