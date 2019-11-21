import React, { useReducer } from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import SubmitButton from "../../components/common/SubmitButton";

const JoinForm = styled.div`
  width: 50%;
  margin: 5rem auto;
`;

const reducer = () => {};

const PartnersJoinPage = () => {
  const [state, dispatch] = useReducer(reducer, {
    name: "",
    email: "",
    password: "",
    CID: "",
    isLoading: false
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

      <div class="field">
        <label class="label">Email</label>
        <div class="control has-icons-left has-icons-right">
          <input
            class="input is-danger"
            type="email"
            placeholder="example@example.com"
          />
          <span class="icon is-small is-left">
            <i class="fas fa-envelope"></i>
          </span>
          <span class="icon is-small is-right">
            <i class="fas fa-exclamation-triangle"></i>
          </span>
        </div>
        <p class="help is-danger">This email is invalid</p>
      </div>

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

      <Link to="/partners/login">
        <button class="button is-text is-small">로그인으로 돌아가기</button>
      </Link>
    </JoinForm>
  );
};

export default PartnersJoinPage;
