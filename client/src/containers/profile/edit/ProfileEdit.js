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
import { Layout, Row, Col, Icon } from "antd";
import "./ProfileEdit.css";

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
			profile.hasTimeZoneError ||
			profile.hasEmailError ||
			profile.hasLinkedInPublicProfileUrlError ||
			profile.hasGithubPublicProfileUrlError ||
			profile.hasAvailabilityError
		) {
			// save should be disabled
			document.documentElement.style.setProperty(
				`--cursor-state`,
				"not-allowed"
			);
			return true;
		} else {
			document.documentElement.style.setProperty(
				`--cursor-state`,
				"pointer"
			);
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
			<Row type="flex" justify="start" align="middle">
				<Col xl={{ offset: 5, span: 19 }}>
					<InputField
						value={profile.name}
						label="Name:"
						errorMessage="Cool name! But we need 1 to 30 valid letters"
						hasError={profile.hasNameError}
						onChange={onChangeName}
					/>
					<Row
						style={{
							height: "41px"
						}}
					/>
					<InputField
						value={profile.email}
						label="E-mail:"
						errorMessage="Invalid e-mail format"
						hasError={profile.hasEmailError}
						onChange={onChangeEmail}
					/>
					<Row
						style={{
							height: "41px"
						}}
					/>
					<InputFieldNumber label="Age:" />
					<Row
						style={{
							height: "30px"
						}}
					/>
					<InputInterests />
					<Row
						style={{
							height: "30px"
						}}
					/>
					<InputField
						value={profile.linkedInPublicProfileUrl}
						label="LinkedIn:"
						errorMessage="Invalid LinkedIn link. Needs to start with http:// or https://"
						hasError={profile.hasLinkedInPublicProfileUrlError}
						onChange={onChangeLinkedInPublicProfileUrl}
					/>
					<Row
						style={{
							padding: "30px 0px 0px 0px"
						}}
					/>
					<InputField
						value={profile.githubPublicProfileUrl}
						label="Github:"
						errorMessage="Invalid github link. Needs to start with http:// or https://"
						hasError={profile.hasGithubPublicProfileUrlError}
						onChange={onChangeGithubPublicProfileUrl}
					/>
					<Row
						type="flex"
						justify="start"
						align="middle"
						style={{
							padding: "30px 0px 0px 0px"
						}}
					>
						<Col>
							<InputTimeZone />
						</Col>
					</Row>
					<Row
						type="flex"
						justify="start"
						align="middle"
						style={{
							padding: "30px 0px 0px 0px"
						}}
					>
						<Col>
							<InputSchedule />
						</Col>
					</Row>
					<Row
						type="flex"
						justify="start"
						style={{
							padding: "30px 0px 0px 0px"
						}}
					>
						<Col>
							<button
								className="profile-edit-button"
								style={{
									borderColor: colorTheme.key,
									background: colorTheme.key,
									color: colorTheme.text1Color
								}}
								disabled={this.isSaveDisabled(profile)}
								onClick={() => saveProfile(profile, history)}
							>
								Save {this.renderSaveIcon(profile.save)}
							</button>
						</Col>
					</Row>
				</Col>
			</Row>
		);
	}

	render() {
		const { colorTheme } = this.props;
		return (
			<Content
				style={{
					padding: "120px 0px 0px", // top left&right bottom
					background: colorTheme.backgroundColor
				}}
			>
				{this.renderContent()}
			</Content>
		);
	}
}

function mapStateToProps(state) {
	return {
		colorTheme: state.colorTheme,
		profile: state.profile
	};
}

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
		saveProfile: (profile, history) => {
			profileDispatchers.saveProfile(profile, history);
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
