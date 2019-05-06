import React, { Component } from "react";
import { connect } from "react-redux";
import {
  GREY_1,
  GREY_5,
  GREY_6,
  GREY_8,
  GREY_9
} from "../styles/ColorConstants";
import { Layout, Row, Col } from "antd";
import { Helmet } from "react-helmet";

const { Content } = Layout;

class Privacy extends Component {
  render() {
    const { colorTheme, loggedInState, name } = this.props;

    let background = colorTheme.backgroundColor;
    let text1Color = colorTheme.text1Color;
    let text2Color = colorTheme.text2Color;
    let text4Color = colorTheme.text4Color;

    if (loggedInState === "not_logged_in") {
      background = GREY_1;
      text1Color = GREY_9;
      text2Color = GREY_8;
      text4Color = GREY_6;
    }

    return (
      <Content
        style={{
          padding: "75px 50px 0px", // top right bottom left
          background: background
        }}
      >
        <Helmet>
          <title>Privacy</title>
          <meta name="robots" content="noindex" />
        </Helmet>
        <Row type="flex" justify="center">
          <Col>
            <h1 style={{ color: text1Color }}>Privacy Policy</h1>
          </Col>
        </Row>
        <Row type="flex" justify="center">
          <Col>
            <p style={{ color: GREY_5 }}>Last revised on June 14, 2018</p>
          </Col>
        </Row>
        <Row type="flex" justify="center">
          <Col>
            <p style={{ color: text2Color }}>
              Hello {name}! Our mission at Infinity2o is to provide anyone the
              perfect learning partner. This explains how we collect, store, and
              protect your information.
            </p>
          </Col>
        </Row>
        <Row type="flex" justify="start">
          <Col>
            <p style={{ color: text2Color }}>1. Collection of Information</p>
            <p style={{ color: text4Color }}>
              When you create an account, we collect information such as:
            </p>
            <ul style={{ color: text4Color }}>
              <li>Name</li>
              <li>Email Address</li>
              <li>
                Location (This location is provided by you since as a company we
                do not use any GPS tracking software)
              </li>
              <li>Login information for LinkedIn Account</li>
              <li>Age</li>
              <li>Interests</li>
              <li>Github information</li>
              <li>Time Zone</li>
              <li>Your free time for video chats</li>
              <li>
                Your profile picture (This image is based off of your email
                address profile picture)
              </li>
            </ul>
            <p style={{ color: text4Color }}>
              By creating an account with infinity2o, you agree to have your
              personal information stored.
            </p>
          </Col>
        </Row>
        <Row type="flex" justify="start">
          <Col>
            <p style={{ color: text2Color }}>2. Use of Information</p>
            <p style={{ color: text4Color }}>
              We never share your personal information with third party
              websites. Infinity2o only stores information to ensure daily
              matches with other users.
            </p>
          </Col>
        </Row>
        <Row type="flex" justify="start">
          <Col>
            <p style={{ color: text2Color }}>3. Disclosure of Information</p>
            <p style={{ color: text4Color }}>
              We will only disclose your personal information if any legal
              matter are at hand. Infinity2o will cooperate with law enforcement
              within or outside your country residency when we are required by
              law to protect interests of a person. We believe disclosure is
              necessary to protect the rights of any individual and to protect
              the company from criminal activity.
            </p>
          </Col>
        </Row>
        <Row type="flex" justify="start">
          <Col>
            <p style={{ color: text2Color }}>4. Cookies</p>
            <p style={{ color: text4Color }}>
              Cookies are just a small data file that is stored in your
              computers. It is a tool that stores information about the
              different websites you visit. Infinity2o uses cookies to help
              match you with other users. We don’t track any other information
              besides what you give us when registering for an account. If you
              don’t wish to use cookies, you won’t be able to create an account
              because you then won’t receive any matches with other users.
            </p>
          </Col>
        </Row>
        <Row type="flex" justify="start">
          <Col>
            <p style={{ color: text2Color }}>
              5. What Others May See About You
            </p>
            <p style={{ color: text4Color }}>
              Just as you can see others profiles, other users can also see
              yours. Information that you entered into your profile such as your
              name, interests, and location will be displayed.
            </p>
          </Col>
        </Row>
        <Row type="flex" justify="start">
          <Col>
            <p style={{ color: text2Color }}>
              6. Modifying Your Registration Information
            </p>
            <p style={{ color: text4Color }}>
              You can change your profile anytime by clicking the edit button on
              your profile page and click save.
            </p>
          </Col>
        </Row>
        <Row type="flex" justify="start">
          <Col>
            <p style={{ color: text2Color }}>7. Our Policy Towards Age</p>
            <p style={{ color: text4Color }}>
              Although we want many users to meet other new and exciting people,
              you must be at least 13 years old to create an account.
            </p>
          </Col>
        </Row>
        <Row type="flex" justify="start">
          <Col>
            <p style={{ color: text2Color }}>8. Changes To This Policy</p>
            <p style={{ color: text4Color }}>
              As infinity2o evolves as a company, our Privacy Policy will change
              over time. If any changes are made, you will be notified by your
              email.
            </p>
          </Col>
        </Row>
        <Row type="flex" justify="start">
          <Col>
            <p style={{ color: text2Color }}>9. Security</p>
            <p style={{ color: text4Color }}>
              We are not liable for any damage to your account, device, or any
              loss of registered information. If any breach of security occurs,
              we will notify the users by email.
            </p>
          </Col>
        </Row>
        <Row type="flex" justify="start">
          <Col>
            <p style={{ color: text2Color }}>10. Third Party Accounts</p>
            <p style={{ color: text4Color }}>
              Registering through Gmail or LinkedIn allows infinity2o to save
              your profile to provide daily matches for you. We do not save any
              other personal information or use your account for any other
              reason.
            </p>
          </Col>
        </Row>
        <Row type="flex" justify="start">
          <Col>
            <p style={{ color: text2Color }}>
              11. Your California Privacy Rights
            </p>
            <p style={{ color: text4Color }}>
              California's "Shine the Light" law, Civil Code section 1798.83,
              requires some businesses to respond to California customers who
              ask about the businesses’ practices related to disclosing personal
              information of users to third parties for their marketing
              purposes. Currently, infinity2o doesn’t have any third party
              affiliate companies.
            </p>
          </Col>
        </Row>
        <Row type="flex" justify="start">
          <Col>
            <p style={{ color: text2Color }}>12. Your UK and EU Rights</p>
            <p style={{ color: text4Color }}>
              Users have the right to file a complaint with data protection
              regulators. You may visit www.ico.org.uk to raise any concerns you
              may with your personal data. We protect your rights with an SSL
              certificate. Also known as a Secure Socket Layer secures user data
              as it travels from their computer to the website. A website has a
              valid SSL certificate if it has the lock icon or https:// in the
              address bar. By using the website, you are consenting that you
              will not file an action against infinity2o. You agree to all of
              the Privacy Policy statements. If you have any questions or
              concerns you can email askinfinity2o@gmail.com
            </p>
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
    loggedInState: state.auth.loggedInState,
    name: state.profile.name
  };
}

/*
So we have a state and a UI(with props).
This function gives the UI the functions it will need to be called.
*/
function mapDispatchToProps(dispatch) {
  return {};
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Privacy);
