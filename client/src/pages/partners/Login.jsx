import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import EmailInput from "../../components/common/EmailInput";
import SubmitButton from "../../components/common/SubmitButton";

const LoginForm = styled.div`
  width: 50%;
  margin: 10rem auto;
`;

const EMAIL_WARN_MSG = "존재하지 않는 이메일 혹은 잘못된 비밀번호입니다.";

const reducer = (state, action) => {};

const PartnersLoginPage = () => {
  const [state, dispatch] = useReducer(reducer, {
    email: "",
    password: "",
    isLoading: false,
    emailWarning: false
  });

  return (
    <LoginForm>
      <h1 className="title is-1">Partner Login</h1>

      <EmailInput emailWarning={state.emailWarning} warnMsg={EMAIL_WARN_MSG} />
      <div className="field">
        <label class="label">Password</label>
        <p className="control has-icons-left">
          <input className="input" type="password" placeholder="비밀번호" />
          <span className="icon is-small is-left">
            <i className="fas fa-lock"></i>
          </span>
        </p>
      </div>

      <SubmitButton isLoading={state.isLoading} content="로그인" />
      <br />
      <Link to="/partners/join">
        <button class="button is-text is-small">파트너 등록하기</button>
      </Link>
    </LoginForm>
  );
};

export default PartnersLoginPage;
