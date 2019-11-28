import React, { useReducer, createContext } from "react";
import { BrowserRouter as Router } from "react-router-dom";
import { createGlobalStyle } from "styled-components";
import AppContainer from "./pages/users/AppContainer";
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
          <AppContainer></AppContainer>
        </AppContext.Provider>
      </Router>
    </div>
  );
}

export default App;
