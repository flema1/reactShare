import React from 'react';

const LoginForm = props => {
  return (
        <form className="loginform" onSubmit={props.handleLoginSubmit}>
          <input
            type="text"
            name="loginUserName"
            value={props.loginUserName}
            placeholder="Username"
            onChange={props.handleInputChange}
          />
          <input
            type="password"
            name="loginPassword"
            value={props.loginPassword}
            placeholder="Password"
            onChange={props.handleInputChange}
          />
          <input className={'login-btn'} type="submit" value="LOGIN" />
        </form>
  );
};

export default LoginForm;