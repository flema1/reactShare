import React from 'react';

const RegisterForm = props => {
  return (
    <div className="registerform">
      <form onSubmit={props.handleRegisterSubmit}>
         <input
          type="text"
          name="registerName"
          value={props.registerName}
          onChange={props.handleInputChange}
          placeholder="Name"
        />
        <input
          type="text"
          name="registerUserName"
          value={props.registerUserName}
          onChange={props.handleInputChange}
          placeholder="Username"
        />
        <input
          type="password"
          name="registerPassword"
          value={props.registerPassword}
          onChange={props.handleInputChange}
          placeholder="Password"
        />
        <input
          type="email"
          name="registerEmail"
          value={props.registerEmail}
          onChange={props.handleInputChange}
          placeholder="Email"
        />
        <input className={'register-btn'} type="submit" value="REGISTER" />
      </form>
    </div>
  );
};

export default RegisterForm;