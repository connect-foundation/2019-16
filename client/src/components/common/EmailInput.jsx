import React from "react";

const EmailInput = ({ emailWarning, warnMsg }) => {
  return (
    <div className="field">
      <label className="label">Email</label>
      {emailWarning ? (
        <>
          <div className="control has-icons-left has-icons-right">
            <input
              className="input is-danger"
              type="email"
              placeholder="example@example.com"
            />
            <span className="icon is-small is-left">
              <i className="fas fa-envelope"></i>
            </span>
            <span className="icon is-small is-right">
              <i className="fas fa-exclamation-triangle"></i>
            </span>
          </div>
          <p className="help is-danger">{warnMsg}</p>
        </>
      ) : (
        <div className="control has-icons-left has-icons-right">
          <input
            className="input"
            type="email"
            placeholder="example@example.com"
          />
          <span className="icon is-small is-left">
            <i className="fas fa-envelope"></i>
          </span>
          <span className="icon is-small is-right">
            <i className="fas fa-check"></i>
          </span>
        </div>
      )}
    </div>
  );
};

export default EmailInput;
