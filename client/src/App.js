import React, { useReducer, createContext } from "react";
import { Route, Switch, BrowserRouter as Router } from "react-router-dom";
import { createGlobalStyle } from "styled-components";
import Header from "./components/Header";
import MainPage from "./pages/users/Main";
import GroupCreatePage from "./pages/users/groupCreate";
import { initalState, appReducer } from "./reducer/App";

const GlobalStyle = createGlobalStyle`
  @import "bulmaCarousel.sass";
  @import url(http://fonts.googleapis.com/earlyaccess/nanumgothic.css);
  @import url('https://fonts.googleapis.com/css?family=Black+Han+Sans&display=swap');
  font-family: "Nanum Gothic", sans-serif;
`;

export const AppContext = createContext();

function App() {
  const [appState, appDispatch] = useReducer(appReducer, initalState);

  return (
    <div className="App">
      <GlobalStyle />
      <Router>
        <AppContext.Provider value={{ appState, appDispatch }}>
          <Header />
          <Switch>
            <Route path="/group/create" component={GroupCreatePage} />
            <Route path="/" component={MainPage} />
            <Route
              render={({ location }) => (
                <div>
                  <h1>존재하지 않는 페이지입니다.</h1>
                  <p>{location.pathname}</p>
                </div>
              )}
            />
          </Switch>
        </AppContext.Provider>
      </Router>
    </div>
  );
}

export default App;
