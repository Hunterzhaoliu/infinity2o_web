import React, { Component } from "react";
import { connect } from "react-redux";
import * as authActionCreators from "../../../actions/auth";
import * as colorThemeActionCreators from "../../../actions/colorTheme";
import * as profileActionCreators from "../../../actions/profile";
import { bindActionCreators } from "redux";
import InputField from "./InputField";
import InputFieldNumber from "./InputFieldNumber";
import InputFieldSelect from "./interests/InputFieldSelect";
import InputSchedule from "./availability/InputSchedule";
import InputTimeZone from "./timeZone/InputTimeZone";
import { Layout, Row, Col, Button, Icon } from "antd";
const { Content } = Layout;

class ProfileEdit extends Component {
  componentWillMount() {
    // run once before first render()
    this.props.fetchUserProfile();
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
      return <Icon type="check" />;
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
			onChangeGithubPublicProfileUrl,
			onChangeWebsiteUrl
		} = this.props;

		return (
			<div>
				<Row
					type="flex"
					justify="start"
					align="middle"
					style={{
						padding: '0% 0% 0%' // top left&right bottom
					}}
				>
					<Col span={24}>
						<InputField
							value={profile.newName}
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
						padding: '1% 0% 0%' // top left&right bottom
					}}
				>
					<Col span={24}>
						<InputField
							value={profile.newEmail}
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
						padding: '1% 0% 0%' // top left&right bottom
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
						padding: '1% 0% 0%' // top left&right bottom
					}}
				>
					<Col span={24}>
						<InputFieldSelect width={280} label="Interest(s):" />
					</Col>
				</Row>
				<Row
					type="flex"
					justify="start"
					align="middle"
					style={{
						padding: '1% 0% 0%' // top left&right bottom
					}}
				>
					<Col span={24}>
						<InputField
							value={profile.newLinkedInPublicProfileUrl}
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
						padding: '1% 0% 0%' // top left&right bottom
					}}
				>
					<Col span={24}>
						<InputField
							value={profile.newGithubPublicProfileUrl}
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
						padding: '1% 0% 0%' // top left&right bottom
					}}
				>
					<Col span={24}>
						<InputField
							value={profile.newWebsiteUrl}
							width={280}
							label="Website:"
							errorMessage="Invalid website link. Needs to start with http:// or https://"
							hasError={profile.hasWebsiteUrlError}
							onChange={onChangeWebsiteUrl}
						/>
					</Col>
				</Row>
				<Row
					type="flex"
					justify="start"
					align="middle"
					style={{
						padding: '1% 0% 0%' // top left&right bottom
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
						padding: '2% 0% 0%' // top left&right bottom
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
						padding: '5% 0% 0%' // top left&right bottom
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
    //console.log('this.props in ProfileEdit.js', this.props);
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
  const indexDispatchers = bindActionCreators(authActionCreators, dispatch);

  const profileDispatchers = bindActionCreators(
    profileActionCreators,
    dispatch
  );
  const colorThemeDispatchers = bindActionCreators(
    colorThemeActionCreators,
    dispatch
  );

	return {
		fetchUserProfile: () => {
			indexDispatchers.fetchUserProfile();
		},
		onProfile: () => {
			colorThemeDispatchers.onProfile();
		},
		saveProfile: (values, history) => {
			profileDispatchers.saveProfile(values, history);
		},
		onChangeName: newName => {
			profileDispatchers.onChangeName(newName);
		},
		onChangeEmail: newEmail => {
			profileDispatchers.onChangeEmail(newEmail);
		},
		onChangeLinkedInPublicProfileUrl: newLinkedInPublicProfileUrl => {
			profileDispatchers.onChangeLinkedInPublicProfileUrl(
				newLinkedInPublicProfileUrl
			);
		},
		onChangeGithubPublicProfileUrl: newGithubPublicProfileUrl => {
			profileDispatchers.onChangeGithubPublicProfileUrl(
				newGithubPublicProfileUrl
			);
		},
		onChangeWebsiteUrl: newWebsiteUrl => {
			profileDispatchers.onChangeWebsiteUrl(newWebsiteUrl);
		}
	};
}

export default connect(mapStateToProps, mapDispatchToProps)(ProfileEdit);
