import { colorsHashtable5 } from './ColorConstants';
import * as colors from './ColorConstants';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Layout, Row, Col } from 'antd';
const { Content } = Layout;

class GreyScale extends Component {
	render() {
		// console.log('this.props in GreyScale.js', this.props);
		return (
			<Content
				style={{
					textAlign: 'center',
					padding: '100px 50px 81px', // top left&right bottom
					background: colors.GREY_5
				}}
			>
				<h1 key="0" style={{ color: this.props.colorTheme.text1Color }}>
					GreyScale
				</h1>
				<Row type="flex" justify="center">
					<Col span={2.1}>
						<Content
							style={{
								padding: '100px 40px', // height width
								background: colors.GREY_0
							}}
						/>
					</Col>
					<Col span={2.1}>
						<Content
							style={{
								padding: '100px 40px', // height width
								background: colors.GREY_1
							}}
						>
							<Content
								style={{
									padding: '50px 20px', // height width
									background: colors.GREEN_1
								}}
							/>
						</Content>
					</Col>
					<Col span={2.1}>
						<Content
							style={{
								padding: '100px 40px', // height width
								background: colors.GREY_2
							}}
						>
							<Content
								style={{
									padding: '50px 20px', // height width
									background: colors.GREEN_2
								}}
							/>
						</Content>
					</Col>
					<Col span={2.1}>
						<Content
							style={{
								padding: '100px 40px', // height width
								background: colors.GREY_3
							}}
						>
							<Content
								style={{
									padding: '50px 20px', // height width
									background: colors.GREEN_3
								}}
							/>
						</Content>
					</Col>
					<Col span={2.1}>
						<Content
							style={{
								padding: '100px 40px', // height width
								background: colors.GREY_4
							}}
						>
							<Content
								style={{
									padding: '50px 20px', // height width
									background: colors.GREEN_4
								}}
							/>
						</Content>
					</Col>
					<Col span={2.1}>
						<Content
							style={{
								padding: '100px 40px', // height width
								background: colors.GREY_5
							}}
						>
							<Content
								style={{
									padding: '50px 20px', // height width
									background: colors.GREEN_5
								}}
							/>
						</Content>
					</Col>
					<Col span={2.1}>
						<Content
							style={{
								padding: '100px 40px', // height width
								background: colors.GREY_6
							}}
						>
							<Content
								style={{
									padding: '50px 20px', // height width
									background: colors.GREEN_6
								}}
							/>
						</Content>
					</Col>
					<Col span={2.1}>
						<Content
							style={{
								padding: '100px 40px', // height width
								background: colors.GREY_7
							}}
						>
							<Content
								style={{
									padding: '50px 20px', // height width
									background: colors.GREEN_7
								}}
							/>
						</Content>
					</Col>
					<Col span={2.1}>
						<Content
							style={{
								padding: '100px 40px', // height width
								background: colors.GREY_8
							}}
						>
							<Content
								style={{
									padding: '50px 20px', // height width
									background: colors.GREEN_8
								}}
							/>
						</Content>
					</Col>
					<Col span={2.1}>
						<Content
							style={{
								padding: '100px 40px', // height width
								background: colors.GREY_9
							}}
						>
							<Content
								style={{
									padding: '50px 20px', // height width
									background: colors.GREEN_9
								}}
							/>
						</Content>
					</Col>
					<Col span={2.1}>
						<Content
							style={{
								padding: '100px 40px', // height width
								background: colors.GREY_10
							}}
						/>
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

export default connect(mapStateToProps, null)(GreyScale);
