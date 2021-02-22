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
import { FONT } from "../styles/Font";
import { Helmet } from "react-helmet";

const { Content } = Layout;

class Privacy extends Component {
  render() {
    const { colorTheme, loggedInState, name, windowWidth } = this.props;

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

    let h2FontSize = "36px";
    let h4FontSize = "24px";
    let h4Padding = "60px 0px 60px 0px";
    let pFontSize = "20px";
    let pPadding = "60px 0px 60px 0px";
    let secondMatchCardPadding = "0px 0px 0px 0px";

    if (windowWidth < 768) {
      h2FontSize = "24px";
      h4FontSize = "18px";
      h4Padding = "30px 0px 30px 0px";
      pFontSize = "16px";
      pPadding = "30px 0px 30px 0px";
      secondMatchCardPadding = "15px 0px 0px 0px";
    }

    return (
      <Content
        style={{
          padding: "75px 50px 0px", // top right bottom left
          background: background
        }}
      >
        <Helmet>
          <title style={{ fontFamily: FONT, fontSize: pFontSize }}>Privacy</title>
          <meta name="robots" content="noindex" />
        </Helmet>
        <Row type="flex" justify="center">
          <Col>
            <h1 style={{ color: text1Color }}>Privacy Policy</h1>
          </Col>
        </Row>
        <Row type="flex" justify="center">
          <Col>
            <p style={{ color: GREY_5 }}>Last revised on ~13.899 * 10^13? + 2021 + 2/9</p>
          </Col>
        </Row>
        <Row type="flex" justify="start">
          <Col>
            <p style={{ color: text2Color }}>1. Collection of Information</p>
            <p style={{ color: text4Color }}>
              With your consent we will save your whole human genome in private
              computers our team keeps secure & unchanged.
            </p>
            <ul style={{ color: text4Color }}>
              <li>Nickname & Legal Birth Name</li>
              <li>E-mail Address</li>
              <li>
                Location (This location is provided by you since as a company we
                do not use any GPS tracking software currently)
              </li>
              <li>Biological age since birth & estimated biological age using
              age estimation strategies</li>
            </ul>
          </Col>
        </Row>
        <Row type="flex" justify="start">
          <Col>
            <p style={{ color: text2Color }}>2. Use of Information</p>
            <p style={{ color: text4Color }}>
              We never share your personal DNA or information with third party
              websites or teams or humans. However, because all humans
              share more than ~98.4% of the exact same DNA [1] some of your
              saved DNA in the computers will be privately used to more
              efficiently save other human's genomes.
            </p>
          </Col>
        </Row>
        <Row type="flex" justify="start">
          <Col>
            <p style={{ color: text2Color }}>3. Disclosure of Information</p>
            <p style={{ color: text4Color }}>
              infinity2o will cooperate with law enforcement that we believe
              deserves our trust within or outside your country residency when
              we are required by a law that makes common && scientific sense.
              If your personal DNA data or information is requested by law
              enforcement with our deserved trust we may send them your
              data without your consent if we think there is a greater than
              99% probability you have commited morally unethical behavior such
              as murder, rape, robbery, burglary, larceny, arson, illegal
              gambling, uncommon illegal drug use, embezzling, extreme
              tax evasion, extreme prostitution, weapons smuggling, money
              laundering, or any other new forms of crime we think are
              morally unethical.
            </p>
          </Col>
        </Row>
        <Row type="flex" justify="start">
          <Col>
            <p style={{ color: text2Color }}>
              4. Modifying Your Registration Information
            </p>
            <p style={{ color: text4Color }}>
              You can change your profile anytime by clicking the edit button on
              your profile page and click save.
            </p>
          </Col>
        </Row>
        <Row type="flex" justify="start">
          <Col>
            <p style={{ color: text2Color }}>5. Our Policy Towards Age</p>
            <p style={{ color: text4Color }}>
              Although we want many users to be able to control your age,
              we are starting with people over 18 since birth.
            </p>
          </Col>
        </Row>
        <Row type="flex" justify="start">
          <Col>
            <p style={{ color: text2Color }}>6. Changes To This Policy</p>
            <p style={{ color: text4Color }}>
              As infinity2o evolves as a company, our Privacy Policy will change
              over time. If any changes are made, you will be notified by your
              email or when you relogin very clearly.
            </p>
          </Col>
        </Row>
        <Row type="flex" justify="start">
          <Col>
            <p style={{ color: text2Color }}>7. Security</p>
            <p style={{ color: text4Color }}>
              We are not liable for any damage to your account, device, or any
              loss of registered information. If any breach of security occurs,
              we will notify the users by email or phone.
            </p>
            <p style={{ color: text4Color }}>
              Users have the right to file a complaint with data protection
              regulators. You may visit www.ico.org.uk to raise any concerns you
              may have with your personal data. We protect your rights with an SSL
              certificate. Also known as a Secure Socket Layer secures user data
              as it travels from their computer to the website. A website has a
              valid SSL certificate if it has the lock icon or https:// in the
              address bar.

              By using the website, you are consenting that you
              will not file an action against infinity2o. You agree to all of
              the Privacy Policy statements. If you have any questions or
              concerns you can email wangzhaoliuq@protonmail.com
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
    name: state.profile.name,
    windowWidth: state.customHeader.windowWidth
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
