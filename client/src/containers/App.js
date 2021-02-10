import React, { Component } from "react";
import { Router, Route } from "react-router-dom";
import * as authActionCreators from "../actions/auth";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import CustomMenu from "./landing/CustomMenu";
import CustomHeader from "./landing/CustomHeader";
import Landing from "./landing/Landing";
import Profile from "./profile/Profile";
import ProfileEdit from "./profile/edit/ProfileEdit";
import SortingHat from "./sorting_hat/SortingHat";
import Matches from "./matches/Matches";
import Conversations from "./conversations/Conversations";
import Sources from "./footer/Sources";
import Team from "./footer/Team";
import Terms from "./footer/Terms";
import Privacy from "./footer/Privacy";
import CustomFooter from "./landing/CustomFooter";
import Unsubscribe from "./unsubscribe/Unsubscribe";
import history from "./history";

import { Layout } from "antd";

class App extends Component {
  render() {
    this.props.initializeApp();
    return (
      <Router history={history}>
        <Layout>
          <Layout style={{ height: "100vh" }}>
            <CustomHeader />
            <CustomMenu />
            <Route exact={true} path="/" component={Landing} />
            <Route exact={true} path="/profile" component={Profile} />
            <Route exact={true} path="/profile/edit" component={ProfileEdit} />
            <Route exact={true} path="/sorting_hat" component={SortingHat} />
            <Route exact={true} path="/matches" component={Matches} />
            <Route
              exact={true}
              path="/conversations"
              component={Conversations}
            />
            <Route exact={true} path="/team" component={Team} />
            <Route exact={true} path="/sources" component={Sources} />
            <Route exact={true} path="/terms" component={Terms} />
            <Route exact={true} path="/privacy" component={Privacy} />
            <CustomFooter />
          </Layout>
        </Layout>
      </Router>
    );
  }
}

function mapDispatchToProps(dispatch) {
  const authDispatchers = bindActionCreators(authActionCreators, dispatch);

  return {
    initializeApp: () => {
      authDispatchers.initializeApp();
    }
  };
}

export default connect(
  null,
  mapDispatchToProps
)(App);
