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

/*

<Col>
    <InputField
        value={profile.name}
        label="Name:"
        errorMessage="Cool name! But we need 1 to 30 valid letters"
        hasError={profile.hasNameError}
        onChange={onChangeName}
    />
</Col>
*/
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
				<Row type="flex" justify="start" align="middle">
					<Col>
						<h4
							style={{
								color: colorTheme.text4Color,
								fontFamily: "Overpass",
								lineHeight: 1,
								marginBottom: 0,
								fontSize: "20px"
							}}
						>
							Name:
						</h4>
					</Col>
					<Col xl={{ offset: 2 }}>
						<input
							className="input-field-input"
							value={profile.name}
							onChange={this.onModify}
							style={{
								color: colorTheme.text2Color,
								borderColor: colorTheme.text8Color,
								backgroundColor: colorTheme.text8Color
							}}
						/>
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
						<InputField
							value={profile.email}
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
						padding: "30px 0px 0px 0px"
					}}
				>
					<Col>
						<InputFieldNumber width={48} label="Age:" />
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
						<InputInterests label="Interest(s):" />
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
						<InputField
							value={profile.linkedInPublicProfileUrl}
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
						padding: "30px 0px 0px 0px"
					}}
				>
					<Col>
						<InputField
							value={profile.githubPublicProfileUrl}
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
						padding: "30px 0px 0px 0px"
					}}
				>
					<Col>
						<InputTimeZone label="Time Zone:" />
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
						<a
							className="profile-edit-anchor"
							style={{
								borderColor: colorTheme.key,
								background: colorTheme.key,
								color: colorTheme.text1Color
							}}
							disabled={this.isSaveDisabled(profile)}
							onClick={() => saveProfile(profile, history)}
						>
							Save {this.renderSaveIcon(profile.save)}
						</a>
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
					padding: "120px 0px 0px", // top left&right bottom
					background: colorTheme.backgroundColor
				}}
			>
				<Row type="flex" justify="start" align="middle">
					<Col xl={{ offset: 5 }}>{this.renderContent()}</Col>
				</Row>
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
