import React, { useReducer } from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import EmailInput from "../../components/users/common/EmailInput";
import SubmitButton from "../../components/users/common/SubmitButton";

const JoinForm = styled.div`
  width: 50%;
  margin: 5rem auto;
`;

const EMAIL_WARN_MSG = "이미 존재하는 이메일입니다.";

const reducer = () => {};

const PartnersJoinPage = () => {
  const [state, dispatch] = useReducer(reducer, {
    name: "",
    email: "",
    password: "",
    CID: "",
    isLoading: false,
    emailWarning: false
  });

  return (
    <JoinForm>
      <h1 className="title is-1">Partner Join</h1>

      <div className="field">
        <label className="label">Name</label>
        <div className="control">
          <input className="input" type="text" placeholder="이름" />
        </div>
      </div>

      <EmailInput emailWarning={state.emailWarning} warnMsg={EMAIL_WARN_MSG} />

      <div className="field">
        <label className="label">Password</label>
        <p className="control has-icons-left">
          <input className="input" type="password" placeholder="비밀번호" />
          <span className="icon is-small is-left">
            <i className="fas fa-lock"></i>
          </span>
        </p>
      </div>

      <div className="field">
        <p className="control has-icons-left">
          <input
            className="input"
            type="password"
            placeholder="비밀번호 확인"
          />
          <span className="icon is-small is-left">
            <i className="fas fa-lock"></i>
          </span>
        </p>
      </div>

      <div className="field">
        <label className="label">CID</label>
        <div className="control">
          <input
            className="input"
            type="text"
            placeholder="가맹점 코드(10자)"
            maxLength="10"
            style={{ textTransform: "uppercase" }}
          />
        </div>
      </div>

      <SubmitButton isLoading={state.isLoading} content="가입하기" />
      <br />
      <Link to="/partners/login">
        <button className="button is-text is-small">로그인으로 돌아가기</button>
      </Link>
    </JoinForm>
  );
};

export default PartnersJoinPage;
