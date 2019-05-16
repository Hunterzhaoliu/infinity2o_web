import React, { Component } from "react";
import { BrowserRouter, Route } from "react-router-dom";
import { connect } from "react-redux";
import CustomMenu from "./landing/CustomMenu";
import CustomHeader from "./landing/CustomHeader";
import Landing from "./landing/Landing";
import Profile from "./profile/Profile";
import ProfileEdit from "./profile/edit/ProfileEdit";
import SortingHat from "./sorting_hat/SortingHat";
import Matches from "./matches/Matches";
import Conversations from "./conversations/Conversations";
import About from "./footer/About";
import Terms from "./footer/Terms";
import Privacy from "./footer/Privacy";
import CustomFooter from "./landing/CustomFooter";
import Unsubscribe from "./unsubscribe/Unsubscribe";

import { Layout } from "antd";

class App extends Component {
  render() {
    return (
      <BrowserRouter>
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
            <Route exact={true} path="/about" component={About} />
            <Route exact={true} path="/terms" component={Terms} />
            <Route exact={true} path="/privacy" component={Privacy} />
            <Route exact={false} path="/unsubscribe" component={Unsubscribe} />
            <CustomFooter />
          </Layout>
        </Layout>
      </BrowserRouter>
    );
  }
}

export default connect(
  null,
  null
)(App);
