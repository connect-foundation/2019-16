import React from "react";
import { Route } from "react-router-dom";
import PartnersLoginPage from "./Login";
import PartnersJoinPage from "./Join";

const PartnerPage = ({ match }) => {
  return (
    <>
      <Route
        path={`${match.path}/login`}
        component={PartnersLoginPage}
        exact={true}
      />
      <Route
        path={`${match.path}/join`}
        component={PartnersJoinPage}
        exact={true}
      />
    </>
  );
};

export default PartnerPage;
