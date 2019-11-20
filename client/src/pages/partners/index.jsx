import React from "react";
import { Route } from "react-router-dom";
import PartnersLoginPage from "./Login";
import PartnersJoinPage from "./Join";

const Index = ({ match }) => {
  return (
    <>
      <Route path={`${match.path}/login`} component={PartnersLoginPage} />
      <Route path={`${match.path}/join`} component={PartnersJoinPage} />
    </>
  );
};

export default Index;
