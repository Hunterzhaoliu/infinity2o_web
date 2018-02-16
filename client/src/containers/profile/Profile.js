import React, { Component } from 'react';
import { connect } from 'react-redux';
import DisplayField from './DisplayField';
import { Layout, Row, Col, Button } from 'antd';
const { Content } = Layout;

class Profile extends Component {
	render() {
		// console.log('this.props in Profile.js', this.props);
		const { colorTheme, currentProfile } = this.props;
		return (
			<Content
				style={{
					padding: '10% 7% 0%', // top left&right bottom
					background: colorTheme.backgroundColor
				}}
			>
				<Row
					type="flex"
					justify="start"
					align="middle"
					style={{
						padding: '3% 0% 0%' // top left&right bottom
					}}
				>
					<Col md={{ span: 24 }}>
						<DisplayField
							label="Name: "
							value={currentProfile.name}
						/>
					</Col>
				</Row>
				<Row
					type="flex"
					justify="start"
					align="middle"
					style={{
						padding: '3% 0% 0%' // top left&right bottom
					}}
				>
					<Col md={{ span: 24 }}>
						<DisplayField
							label="Age: "
							value={currentProfile.age}
						/>
					</Col>
				</Row>
				<Row
					type="flex"
					justify="start"
					align="middle"
					style={{
						padding: '3% 0% 0%' // top left&right bottom
					}}
				>
					<Col md={{ span: 24 }}>
						<DisplayField
							label="Interest(s): "
							value={currentProfile.interests}
						/>
					</Col>
				</Row>
				<Row
					type="flex"
					justify="start"
					align="middle"
					style={{
						padding: '3% 0% 0%' // top left&right bottom
					}}
				>
					<Col md={{ span: 24 }}>
						<DisplayField
							label="Time Zone: "
							value={currentProfile.time_zone}
						/>
					</Col>
				</Row>
				<Row
					type="flex"
					justify="start"
					align="middle"
					style={{
						padding: '3% 0% 0%' // top left&right bottom
					}}
				>
					<Col md={{ span: 24 }}>
						<DisplayField
							label="Availability: "
							value={currentProfile.availability}
						/>
					</Col>
				</Row>
				<Row
					type="flex"
					justify="start"
					style={{
						padding: '3% 0% 0%' // top left&right bottom
					}}
				>
					<Col span={24}>
						<Button
							style={{
								borderColor: colorTheme.key,
								background: colorTheme.key,
								color: colorTheme.text1Color
							}}
						>
							<a href="/profile/edit">Edit</a>
						</Button>
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
		colorTheme: state.colorTheme,
		currentProfile: state.profile
	};
}

export default connect(mapStateToProps, null)(Profile);
