import React from "react";
import { Route, Switch, BrowserRouter as Router } from "react-router-dom";
import { createGlobalStyle } from "styled-components";
import PartnersRouter from "./pages/partners/Router";
import Header from "./components/Header";
import MainPage from "./pages/users/Main";

const GlobalStyle = createGlobalStyle`
  @import url(http://fonts.googleapis.com/earlyaccess/nanumgothic.css);
  @import url('https://fonts.googleapis.com/css?family=Black+Han+Sans&display=swap');
  font-family: "Nanum Gothic", sans-serif;
`;

function App() {
  return (
    <div className="App">
      <GlobalStyle />
      <Router>
        <Header />
        <Switch>
          <Route path="/" exact component={MainPage} />
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
      </Router>
    </div>
  );
}

export default App;
