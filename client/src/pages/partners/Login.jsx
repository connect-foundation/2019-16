import React, { useReducer } from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";

const LoginForm = styled.div`
  width: 50%;
  margin: 5rem auto;
`;

const PartnersLoginPage = () => (
  <LoginForm>
    <h1 className="title is-1">Partner Login</h1>

    <div className="field">
      <p className="control has-icons-left has-icons-right">
        <input className="input" type="email" placeholder="Email" />
        <span className="icon is-small is-left">
          <i className="fas fa-envelope"></i>
        </span>
        <span className="icon is-small is-right">
          <i className="fas fa-check"></i>
        </span>
      </p>
    </div>

    <div className="field">
      <p className="control has-icons-left">
        <input className="input" type="password" placeholder="Password" />
        <span className="icon is-small is-left">
          <i className="fas fa-lock"></i>
        </span>
      </p>
    </div>

    <button className="button is-danger is-rounded is-fullwidth is-medium">
      Login
    </button>

    <Link to="/partners/join">
      <button class="button is-text is-small">파트너 등록하기</button>
    </Link>
  </LoginForm>
);

export default PartnersLoginPage;
