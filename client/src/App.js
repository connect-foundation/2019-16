import React from "react";
import { Route } from "react-router-dom";
import { createGlobalStyle } from "styled-components";
import PartnersPage from "./pages/partners/index";

const GlobalStyle = createGlobalStyle`
  @import url(http://fonts.googleapis.com/earlyaccess/nanumgothic.css);
  @import url(http://fonts.googleapis.com/earlyaccess/nanumgothiccoding.css);
  @import url(http://fonts.googleapis.com/earlyaccess/nanummyeongjo.css);
  @import url(http://fonts.googleapis.com/earlyaccess/nanumbrushscript.css);
  @import url(http://fonts.googleapis.com/earlyaccess/nanumpenscript.css);
  @import url(http://cdn.jsdelivr.net/font-nanum/1.0/nanumbarungothic/nanumbarungothic.css);
`;

function App() {
  return (
    <div className="App">
      <GlobalStyle />
      <Route path="/partners" component={PartnersPage} />
    </div>
  );
}

export default App;
