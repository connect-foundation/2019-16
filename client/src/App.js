import React, { useReducer, createContext } from "react";
import { BrowserRouter as Router } from "react-router-dom";
import { createGlobalStyle } from "styled-components";
import UserPage from "./pages/users";
import PartnerPage from "./pages/partners";
import { initalState, appReducer } from "./reducer/App";

const GlobalStyle = createGlobalStyle`
  @import "bulmaCarousel.sass";
  @import url(http://fonts.googleapis.com/earlyaccess/nanumgothic.css);
  @import url('https://fonts.googleapis.com/css?family=Black+Han+Sans&display=swap');
  font-family: "Nanum Gothic", sans-serif;
`;

export const UserContext = createContext();

function App() {
  const [appState, appDispatch] = useReducer(appReducer, initalState);

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
