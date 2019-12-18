import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import { createGlobalStyle } from "styled-components";
import UserPage from "./pages/users";
import PartnerPage from "./pages/partners";

const GlobalStyle = createGlobalStyle`
  @import "bulmaCarousel.sass";
  @import url("https://fonts.googleapis.com/earlyaccess/nanumgothic.css");
  @import url('https://fonts.googleapis.com/css?family=Black+Han+Sans&display=swap');
`;

function App() {
  return (
    <div className="App">
      <GlobalStyle />
      <Router>
        <Route path="/" component={UserPage} />
        <Route path="/partners" component={PartnerPage} />
      </Router>
    </div>
  );
}

export default App;
