import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Layout, Row, Col, Card, Carousel } from 'antd';
const { Content } = Layout;
const { Meta } = Card;

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
				<h2 key="1" style={{ color: this.props.colorTheme.text2Color }}>
					Teach our AI which study partner you prefer by swapping out
					the partner you don't want.
				</h2>
				<Row type="flex" justify="space-between" align="top">
					<Col span={2} />
					<Col
						span={8}
						style={{
							height: '50%'
						}}
					>
						<Card
							hoverable={true}
							borderded={false}
							loading={false}
							style={{
								width: '100%',
								color: this.props.colorTheme.text1Color,
								background: this.props.colorTheme.text4Color
							}}
							cover={
								<img
									alt="example"
									src="https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png"
								/>
							}
						>
							<p>Name: Karly</p>
							<p>Learning interests: Machine Learning</p>
							<p>Class interest: LINK_TO_ONLINE_CLASS</p>
							<p># of hours/week free: 5</p>
							<p>Resume: CLICK_TO_EXPAND</p>
						</Card>
					</Col>
					<Col
						span={8}
						style={{
							height: '50%'
						}}
					>
						<Card
							hoverable={true}
							style={{
								width: '100%',
								color: this.props.colorTheme.text1Color,
								background: this.props.colorTheme
									.backgroundColor
							}}
							cover={
								<img
									alt="example"
									src="https://camd.northeastern.edu/wp-content/uploads/2016/02/Cory.png"
								/>
							}
						>
							<p>Name: Joe</p>
							<p>Learning interests: Machine Learning</p>
							<p>Class interest: LINK_TO_ONLINE_CLASS</p>
							<p># of hours/week free: 4</p>
							<p>Resume: CLICK_TO_EXPAND</p>
						</Card>
					</Col>
					<Col span={2} />
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

export default connect(mapStateToProps, null)(DashboardMatches);
