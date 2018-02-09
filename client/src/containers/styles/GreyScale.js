import _ from 'lodash';
import { colorsHashtable } from './ColorConstants';
import * as colors from './ColorConstants';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Layout, Row, Col } from 'antd';
const { Content } = Layout;

const scaleFields = [
	{
		color: colors.GREY_0,
		color2: colors.GREEN_1
	},
	{
		color: colors.GREY_1,
		color2: colors.GREEN_1
	},
	{
		color: colors.GREY_2,
		color2: colors.GREEN_2
	},
	{
		color: colors.GREY_3,
		color2: colors.GREEN_3
	},
	{
		color: colors.GREY_4,
		color2: colors.GREEN_4
	},
	{
		color: colors.GREY_5,
		color2: colors.GREEN_5
	},
	{
		color: colors.GREY_6,
		color2: colors.GREEN_6
	},
	{
		color: colors.GREY_7,
		color2: colors.GREEN_7
	},
	{
		color: colors.GREY_8,
		color2: colors.GREEN_8
	},
	{
		color: colors.GREY_9,
		color2: colors.GREEN_9
	},
	{
		color: colors.GREY_10,
		color2: colors.GREEN_9
	}
];

// Add the following to App.js for color rgb value development
/* <Route
    exact={true}
    path="/greyscale"
    component={GreyScale}
/> */
class GreyScale extends Component {
	renderScales() {
		return _.map(scaleFields, field => {
			return (
				<Col span={2.1} key={field.color}>
					<Content
						style={{
							padding: '100px 40px', // height width
							background: field.color
						}}
					>
						<Content
							style={{
								padding: '50px 20px', // height width
								background: field.color2
							}}
						/>
					</Content>
				</Col>
			);
		});
	}

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
					{this.renderScales()}
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
