import React from "react";
import { Route, Switch } from "react-router-dom";
import { createGlobalStyle } from "styled-components";
import PartnersRouter from "./pages/partners/Router";

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
      <Switch>
        <Route path="/partners" component={PartnersRouter} />
        <Route
          render={({ location }) => (
            <div>
              <h1>존재하지 않는 페이지입니다.</h1>
              <p>{location.pathname}</p>
            </div>
          )}
        />
      </Switch>
    </div>
  );
}

export default App;
