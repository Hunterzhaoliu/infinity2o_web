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

class Terms extends Component {
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

    if (windowWidth < 768) {
      h2FontSize = "24px";
      h4FontSize = "18px";
      h4Padding = "30px 0px 30px 0px";
      pFontSize = "16px";
      pPadding = "30px 0px 30px 0px";
    }

    return (
      <Content
        style={{
          padding: "75px 50px 0px", // top right bottom left
          background: background,
          fontFamily: FONT, fontSize: pFontSize
        }}
      >
        <Helmet>
          <title>Terms</title>
          <meta name="robots" content="noindex" />
        </Helmet>
        <Row type="flex" justify="center">
          <Col>
            <h1 style={{ color: text1Color }}>Terms of Use & Conditions</h1>
          </Col>
        </Row>
        <Row type="flex" justify="center">
          <Col>
            <p style={{ color: GREY_5 }}>Last revised on ~13.899 * 10^13? + 2021 + 2/9</p>
          </Col>
        </Row>
        <Row type="flex" justify="start">
          <Col>
            <p style={{ color: text2Color }}>
              1. Acceptance of Terms of Use Agreement
            </p>
            <p style={{ color: text4Color }}>
              By creating an account on infinity2o, you must be
              at least 18 years old. By using your Apple ID or email account to
              login, you agree to the Terms and Condition, Privacy Policy, and
              the use of Cookies.
            </p>
          </Col>
        </Row>
        <Row type="flex" justify="start">
          <Col>
            <p style={{ color: text2Color }}>2. Types of Content</p>
            <p style={{ color: text4Color }}>
              Any content that you post or create is your responsibility and you
              cannot hold infinity2o or other users accountable for anything
              that you create. If you reveal any personal information such as
              mailing address or banking details, it is at your own risk.
            </p>
            <ul style={{ color: text4Color }}>
              <li>
                You can not sell, use, or modify infinity2o’s content except as
                permitted through the website.
              </li>
              <li>
                You can not create similar work from our content or commercially
                exploit our content.
              </li>
              <li>You can only use our content for lawful purposes only.</li>
            </ul>
          </Col>
        </Row>
        <Row type="flex" justify="start">
          <Col>
            <p style={{ color: text2Color }}>3. Restrictions of the App</p>
            <p style={{ color: text4Color }}>
              By using the website infinity2o.com and creating an account, you
              agree to:
            </p>
            <ul style={{ color: text4Color }}>
              <li>
                Comply with all applicable laws, including without limitation,
                privacy laws, intellectual property laws, anti-spam laws, equal
                opportunity laws and regulatory requirements.
              </li>
              <li>Use your real legal name and not someone else’s identity,
              however nicknames created after important events in your life are
              allowed.</li>
              <li>Use the service in a professional manner.</li>
            </ul>
            <p style={{ color: text4Color }}>You agree not to:</p>
            <ul style={{ color: text4Color }}>
              <li>Act in an unlawful manner.</li>
              <li>Misrepresent your real identity.</li>
              <li>
                Disclose information that you do not have the consent to
                disclose.
              </li>
              <li>Create any fraud or similar practices.</li>
            </ul>
          </Col>
        </Row>
        <Row type="flex" justify="start">
          <Col>
            <p style={{ color: text2Color }}>4. Privacy</p>
            <p style={{ color: text4Color }}>
              By using infinity2o, you agree to accept our Privacy Policy
            </p>
          </Col>
        </Row>
        <Row type="flex" justify="start">
          <Col>
            <p style={{ color: text2Color }}>5. Location Based Features</p>
            <p style={{ color: text4Color }}>
              Your location is solely based on the information you share since
              inifinity2o currently doesn’t have a GPS tracking service.
            </p>
          </Col>
        </Row>
        <Row type="flex" justify="start">
          <Col>
            <p style={{ color: text2Color }}>6. Disclaimer</p>
            <p style={{ color: text4Color }}>
              The site of infinity2o content is without warranty of any kind,
              either expressed or implied. Should the law not permit the
              exclusion of express or implied warranties, we grant the minimum
              express or implied warranty required by applicable law.
              Additionally, although we will do our best to achieve as close
              to 100% accurracy & security as possible we do not make the claim
              that the site and your data will be 100% secure, or 100% error
              free at all times. infinity2o takes full responsibility if your
              data is stolen or purposely edited with unmoral or unethical
              intent && will conduct an internal investigation as to why the
              inaccurate data was produced or data was stolen using a team
              based on who we believe are the most competent detectives.
              We currently do not conduct criminal background checks on
              all of our customers.

              If you are dissatisfied in anyway with infinity2o's service,
              your remedy is to stop the use of the site & contact our
              headquarters to retrieve your collected data. You hereby waive any
              and all claims that arise out of your use of the site. Due to some
              states not allowing the disclaimer of implied warranties, some of
              these provisions may not apply to you. If any portion of this
              liability is invalid, our aggregate liability shall not exceed one
              penny U.S. currency. This limitation of liability is a
              fundamental element of the basis of bargain and reflects a fair
              allocation of risk. You agree that the limitations and exclusions
              of liability specified will survive even if found to have failed
              in their essential purpose.
            </p>
          </Col>
        </Row>
        <Row type="flex" justify="start">
          <Col>
            <p style={{ color: text2Color }}>7. Indemnity</p>
            <p style={{ color: text4Color }}>
              All the actions you make and information you post on
              infinity2o remain your responsibility. Therefore, you agree to
              indemnify, defend, release, and hold us, and our partners
              harmless, from and against any third party claims, damages, or
              actions.
            </p>
          </Col>
        </Row>
        <Row type="flex" justify="start">
          <Col>
            <p style={{ color: text2Color }}>
              8. Digital Millennium Copyright Act
            </p>
            <p style={{ color: text4Color }}>
              Under the Digital Millennium Copyright act, the DMCA, if any of
              our content infringes upon your intellectual property rights,
              submit a notification alleging this infringement to
              wangzhaoliuq@protonmail.com
            </p>
          </Col>
        </Row>
        <Row type="flex" justify="start">
          <Col>
            <p style={{ color: text2Color }}>9. Miscellaneous</p>
            <p style={{ color: text4Color }}>
              These Terms and Conditions, which we may change and will notify
              you by email, constitute the agreement between you and infinity2o.
              The terms supersede all previous agreements. infinity2o does not
              give or make any warranty of any kind about the information of
              infinity2o. The use of infinity2o is at your own risk.
              infinity2o cannot be held accountable or responsible for any loss.
              You are responsible for taking all necessary precautions to ensure
              that infinity2o is free of viruses and other harmful components.
              infinity2o is not responsible for any damage to your computer
              hardware, computer software, or other equipment or technology from
              security breaches or any form of viruses, bugs, tampering, or
              fraud. If for any reason the Terms are declared illegal, the
              extent to that term being illegal will be deleted and the rest of
              the Terms will remain in full force and effect.
            </p>
          </Col>
        </Row>
        <Row type="flex" justify="start">
          <Col>
            <p style={{ color: text2Color }}>10. Recap</p>
            <p style={{ color: text4Color }}>
              By creating an account on infinity2o, you are consenting to the
              law and agree that you will not file or participate in a class
              action against infinity2o’s company creators unless you have
              a good reason to believe we have used your data in an unmoral
              or unethical manner. If there are any
              translated copies of the Terms, the original English version will
              surpass any other version. By using the website or any other
              of our services, you are
              consenting that you will not file an action against infinity2o.
              You agree to all of the Terms and Condition statements. If you
              have any questions or concern you may email
              wangzhaoliuq@protonmail.com
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
)(Terms);
