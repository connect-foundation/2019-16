import React, { useEffect, createContext } from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import {
  initialState,
  userInfoReducer,
  set_user_info
} from "./reducer/users/userInfo";
import { createGlobalStyle } from "styled-components";
import UserPage from "./pages/users";
import PartnerPage from "./pages/partners";

import Cookies from "js-cookie";
import jwt_decode from "jwt-decode";

const GlobalStyle = createGlobalStyle`
  @import "bulmaCarousel.sass";
  @import url(http://fonts.googleapis.com/earlyaccess/nanumgothic.css);
  @import url('https://fonts.googleapis.com/css?family=Black+Han+Sans&display=swap');
  font-family: "Nanum Gothic", sans-serif;
`;

export const UserContext = createContext(initialState);

function App() {
  useEffect(() => {
    const userInfo = jwtParser();
    userInfoReducer(initialState, set_user_info(userInfo));
  }, []);

  return (
    <div className="App">
      <GlobalStyle />
      <UserContext.Provider value={initialState}>
        <Router>
          <Route path="/" component={UserPage} />
          <Route path="/partners" component={PartnerPage} />
        </Router>
      </UserContext.Provider>
    </div>
  );
}

export default App;

const jwtParser = () => {
  const jwt = Cookies.get("access_token");
  return jwt_decode(jwt);
};
