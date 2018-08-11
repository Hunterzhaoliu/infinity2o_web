import React, { Component } from "react";
import { connect } from "react-redux";
import * as colorThemeActionCreators from "../../../actions/colorTheme";
import * as profileActionCreators from "../../../actions/profile/profile";
import { bindActionCreators } from "redux";
import InputField from "./InputField";
import InputFieldNumber from "./InputFieldNumber";
import InputInterests from "./interests/InputInterests";
import InputSchedule from "./availability/InputSchedule";
import InputTimeZone from "./timeZone/InputTimeZone";
import "./ProfileEdit.css";
import { Layout, Row, Col, Button, Icon } from "antd";
const { Content } = Layout;

class ProfileEdit extends Component {
	componentWillMount() {
		// run once before first render()
		this.props.onProfile();
	}

	isSaveDisabled(profile) {
		if (
			profile.hasNameError ||
			profile.hasAgeError ||
			profile.hasInterestsError ||
			profile.hasTimeZoneError
		) {
			return true;
		} else {
			return false;
		}
	}

	renderSaveIcon(saveState) {
		if (saveState === "save_start") {
			return <Icon type="loading" />;
		} else if (saveState === "save_done") {
			return;
		} else if (saveState === "save_error") {
			return <Icon type="warning" />;
		}
	}

	renderContent() {
		const {
			colorTheme,
			saveProfile,
			profile,
			history,
			onChangeName,
			onChangeEmail,
			onChangeLinkedInPublicProfileUrl,
			onChangeGithubPublicProfileUrl
		} = this.props;

		return (
			<div>
				<Row
					type="flex"
					justify="start"
					align="middle"
					style={{
						padding: "0% 0% 0%" // top left&right bottom
					}}
				>
					<Col span={24}>
						<InputField
							value={profile.name}
							width={280}
							label="Name:"
							errorMessage="Cool name! But we need 1 to 30 valid letters"
							hasError={profile.hasNameError}
							onChange={onChangeName}
						/>
					</Col>
				</Row>
				<Row
					type="flex"
					justify="start"
					align="middle"
					style={{
						padding: "1% 0% 0%" // top left&right bottom
					}}
				>
					<Col span={24}>
						<InputField
							value={profile.email}
							width={280}
							label="E-mail:"
							errorMessage="Invalid e-mail format"
							hasError={profile.hasEmailError}
							onChange={onChangeEmail}
						/>
					</Col>
				</Row>
				<Row
					type="flex"
					justify="start"
					align="middle"
					style={{
						padding: "1% 0% 0%" // top left&right bottom
					}}
				>
					<Col span={24}>
						<InputFieldNumber width={48} label="Age:" />
					</Col>
				</Row>
				<Row
					type="flex"
					justify="start"
					align="middle"
					style={{
						padding: "1% 0% 0%" // top left&right bottom
					}}
				>
					<Col span={24}>
						<InputInterests width={280} label="Interest(s):" />
					</Col>
				</Row>
				<Row
					type="flex"
					justify="start"
					align="middle"
					style={{
						padding: "1% 0% 0%" // top left&right bottom
					}}
				>
					<Col span={24}>
						<InputField
							value={profile.linkedInPublicProfileUrl}
							width={280}
							label="LinkedIn:"
							errorMessage="Invalid LinkedIn link. Needs to start with http:// or https://"
							hasError={profile.hasLinkedInPublicProfileUrlError}
							onChange={onChangeLinkedInPublicProfileUrl}
						/>
					</Col>
				</Row>
				<Row
					type="flex"
					justify="start"
					align="middle"
					style={{
						padding: "1% 0% 0%" // top left&right bottom
					}}
				>
					<Col span={24}>
						<InputField
							value={profile.githubPublicProfileUrl}
							width={280}
							label="Github:"
							errorMessage="Invalid github link. Needs to start with http:// or https://"
							hasError={profile.hasGithubPublicProfileUrlError}
							onChange={onChangeGithubPublicProfileUrl}
						/>
					</Col>
				</Row>
				<Row
					type="flex"
					justify="start"
					align="middle"
					style={{
						padding: "1% 0% 0%" // top left&right bottom
					}}
				>
					<Col span={24}>
						<InputTimeZone width={280} label="Time Zone:" />
					</Col>
				</Row>
				<Row
					type="flex"
					justify="start"
					align="middle"
					style={{
						padding: "2% 0% 0%" // top left&right bottom
					}}
				>
					<Col span={24}>
						<InputSchedule />
					</Col>
				</Row>
				<Row
					type="flex"
					justify="start"
					style={{
						padding: "5% 0% 0%" // top left&right bottom
					}}
				>
					<Col span={24}>
						<Button
							style={{
								borderColor: colorTheme.key,
								background: colorTheme.key,
								color: colorTheme.text1Color
							}}
							disabled={this.isSaveDisabled(profile)}
							onClick={() => saveProfile(profile, history)}
						>
							Save {this.renderSaveIcon(profile.save)}
						</Button>
					</Col>
				</Row>
			</div>
		);
	}

	render() {
		const { colorTheme } = this.props;
		return (
			<Content
				style={{
					padding: "75px 50px 0px", // top left&right bottom
					background: colorTheme.backgroundColor
				}}
			>
				<Row type="flex" justify="start" align="middle">
					<Col xl={{ span: 5 }} />
					<Col xl={{ span: 14 }}>{this.renderContent()}</Col>
					<Col xl={{ span: 5 }} />
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
		profile: state.profile
	};
}

/*
So we have a state and a UI(with props).
This function gives the UI the functions it will need to be called.
*/
function mapDispatchToProps(dispatch) {
	const profileDispatchers = bindActionCreators(
		profileActionCreators,
		dispatch
	);
	const colorThemeDispatchers = bindActionCreators(
		colorThemeActionCreators,
		dispatch
	);

	return {
		onProfile: () => {
			colorThemeDispatchers.onProfile();
		},
		saveProfile: (values, history) => {
			profileDispatchers.saveProfile(values, history);
		},
		onChangeName: name => {
			profileDispatchers.onChangeName(name);
		},
		onChangeEmail: email => {
			profileDispatchers.onChangeEmail(email);
		},
		onChangeLinkedInPublicProfileUrl: linkedInPublicProfileUrl => {
			profileDispatchers.onChangeLinkedInPublicProfileUrl(
				linkedInPublicProfileUrl
			);
		},
		onChangeGithubPublicProfileUrl: githubPublicProfileUrl => {
			profileDispatchers.onChangeGithubPublicProfileUrl(
				githubPublicProfileUrl
			);
		}
	};
}

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(ProfileEdit);
