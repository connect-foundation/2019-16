import React, { useReducer } from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import EmailInput from "../../components/common/EmailInput";
import SubmitButton from "../../components/common/SubmitButton";

const JoinForm = styled.div`
  width: 50%;
  margin: 10rem auto;
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
      <h1 class="title is-1">Partner Join</h1>

      <div class="field">
        <label class="label">Name</label>
        <div class="control">
          <input class="input" type="text" placeholder="이름" />
        </div>
      </div>

      <EmailInput emailWarning={state.emailWarning} warnMsg={EMAIL_WARN_MSG} />

      <div class="field">
        <label class="label">Password</label>
        <p class="control has-icons-left">
          <input class="input" type="password" placeholder="비밀번호" />
          <span class="icon is-small is-left">
            <i class="fas fa-lock"></i>
          </span>
        </p>
      </div>

      <div class="field">
        <p class="control has-icons-left">
          <input class="input" type="password" placeholder="비밀번호 확인" />
          <span class="icon is-small is-left">
            <i class="fas fa-lock"></i>
          </span>
        </p>
      </div>

      <div class="field">
        <label class="label">CID</label>
        <div class="control">
          <input
            class="input"
            type="text"
            placeholder="가맹점 코드(10자)"
            maxLength="10"
            style={{ "text-transform": "uppercase" }}
          />
        </div>
      </div>

      <SubmitButton isLoading={state.isLoading} content="가입하기" />
      <br />
      <Link to="/partners/login">
        <button class="button is-text is-small">로그인으로 돌아가기</button>
      </Link>
    </JoinForm>
  );
};

export default PartnersJoinPage;
