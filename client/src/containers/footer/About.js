import React, { Component } from "react";
import { connect } from "react-redux";
import { GREY_1, GREY_3, GREY_9 } from "../styles/ColorConstants";
import { Layout, Row, Col } from "antd";
import MatchCards from "../matches/MatchCards";
import { Helmet } from "react-helmet";
import "./about.css";

const { Content } = Layout;

class About extends Component {
  // renderTeam() {
  // 	const { teamMembers, colorTheme } = this.props;
  //
  // 	return _.map(teamMembers, teamMember => {
  // 		return (
  // 			<Col>
  // 				<h1 style={{ color: colorTheme.text2Color }}>Hi</h1>
  // 			</Col>
  // 		);
  // 	});
  // }

  render() {
    const { colorTheme, loggedInState } = this.props;

    let background = colorTheme.backgroundColor;
    let headerColor = colorTheme.text1Color;
    let paragraphColor = colorTheme.text3Color;
    if (loggedInState === "not_logged_in") {
      background = GREY_1;
      headerColor = GREY_9;
      paragraphColor = GREY_3;
    }

    const q = {
      name: "Q Liu",
      age: 25,
      totalUserVotes: 62,
      interests: [
        "entrepreneurship",
        "nutrition",
        "robotics",
        "mechanical_engineering",
        "electrical_engineering"
      ],
      linkedInPublicProfileUrl: "https://www.linkedin.com/in/letterq/",
      githubPublicProfileUrl: "https://github.com/quinnliu",
      imageUrl:
        "https://lh5.googleusercontent.com/-J_P0Sk0phsE/AAAAAAAAAAI/AAAAAAAAACU/kM-9AVW-rl8/photo.j150"
    };

    const hunter = {
      name: "Hunter Liu",
      age: 18,
      totalUserVotes: 47,
      interests: [
        "artificial_intelligence",
        "computer_science",
        "design",
        "economics",
        "entrepreneurship"
      ],
      linkedInPublicProfileUrl: "https://www.linkedin.com/in/hunterzhaoliu/",
      githubPublicProfileUrl: "https://github.com/Hunter690",
      imageUrl:
        "https://lh4.googleusercontent.com/-_cJdeMMJK7c/AAAAAAAAAAI/AAAAAAAAAhA/7XZmb3NeW9g/photo.j150"
    };

    return (
      <Content
        style={{
          textAlign: "center",
          padding: "120px 0px 0px",
          background: background
        }}
      >
        <Helmet>
          <title>About</title>
        </Helmet>
        <Row type="flex" justify="center">
          <Col>
            <h2 className="about-h2" style={{ color: headerColor }}>
              About
            </h2>
          </Col>
        </Row>
        <Row
          style={{ padding: "60px 0px 0px 0px" }}
          type="flex"
          justify="center"
        >
          <Col>
            <h4 className="about-h4" style={{ color: headerColor }}>
              We took 20+ online courses alone and then 3 together before
              starting infinity2o.
            </h4>
          </Col>
        </Row>
        <Row
          style={{ padding: "60px 0px 60px 0px" }}
          type="flex"
          justify="center"
        >
          <Col xl={{ span: 7 }}>
            <MatchCards match={q} />
          </Col>
          <Col xl={{ offset: 1, span: 7 }}>
            <MatchCards match={hunter} />
          </Col>
        </Row>
        <Row style={{ padding: "0px 0px 60px 0px" }} type="flex" justify="left">
          <Col xl={{ offset: 5, span: 14 }}>
            <p className="about-p" style={{ color: paragraphColor }}>
              &emsp; We believe online courses will be very important in future
              education. But until now, online courses have been indepedent
              places to learn reliant on random discussion forums with broken
              responses rather than real discussion.
            </p>
          </Col>
        </Row>
      </Content>
    );
  }
}

function mapStateToProps(state) {
  return {
    colorTheme: state.colorTheme,
    loggedInState: state.auth.loggedInState
  };
}

export default connect(
  mapStateToProps,
  null
)(About);
