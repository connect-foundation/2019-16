import React, { useReducer } from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import SubmitButton from "../../components/common/SubmitButton";

const LoginForm = styled.div`
  width: 50%;
  margin: 5rem auto;
`;

const reducer = (state, action) => {};

const PartnersLoginPage = () => {
  const [state, dispatch] = useReducer(reducer, {
    email: "",
    password: "",
    isLoading: false
  });

  return (
    <LoginForm>
      <h1 className="title is-1">Partner Login</h1>

      <div className="field">
        <p className="control has-icons-left has-icons-right">
          <input
            className="input"
            type="email"
            placeholder="Email"
            // onChange={}
          />
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
          <input
            className="input"
            type="password"
            placeholder="Password"
            // onChange={}
          />
          <span className="icon is-small is-left">
            <i className="fas fa-lock"></i>
          </span>
        </p>
      </div>

      <SubmitButton isLoading={state.isLoading} content="로그인" />

      <Link to="/partners/join">
        <button class="button is-text is-small">파트너 등록하기</button>
      </Link>
    </LoginForm>
  );
};

export default PartnersLoginPage;
