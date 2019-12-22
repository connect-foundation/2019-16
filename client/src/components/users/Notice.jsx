import React from "react";

const closeNotice = () => {
  document.getElementById("notice").style.display = "none";
};

const Notice = () => (
  <div id="notice" className="notification is-danger">
    <button
      className="delete is-large"
      style={{ margin: "0.3rem" }}
      onClick={closeNotice}
    />
    <h5 className="title is-5" style={{ textAlign: "center" }}>
      🤦🏻‍♂️🤦🏻‍♀️ 현재 스터디컴바인은 사업자 등록을 하지 않았기 때문에 이메일 수집을
      필수적으로 할 수 없습니다. 😓
    </h5>
    <h5 className="title is-5" style={{ textAlign: "center" }}>
      카카오 로그인을 할 때, 이메일을 동의하지 않으면 정상적인 서비스 사용이
      불가하니 동의 버튼을 눌러주시기 바랍니다. 🙏
    </h5>
  </div>
);

export default Notice;
