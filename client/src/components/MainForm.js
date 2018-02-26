import React, { Component } from 'react';
import LoginForm from './LoginForm';
import RegisterForm from './RegisterForm';
import Auth from '../modules/Auth';
import axios from 'axios';
import { Redirect,
} from 'react-router-dom';
import Room from './Room';

export default class MainForm extends Component {
  constructor(props){
      super(props);
      this.state={
        form:'LOGIN',
        loginUserName: '',
        loginPassword: '',
        registerUserName: '',
        registerPassword: '',
        registerEmail: '',
        registerName: '',
        username:'',
      }
    }

  toggleForm(path){
    this.setState({ form:path})
  }

  handleLoginSubmit(e) {
    e.preventDefault();
    axios.post('auth/login', {
      username: this.state.loginUserName,
      password: this.state.loginPassword,
    }).then(res => {
      console.log(res);
      if (res.data.token) {
        Auth.authenticateToken(res.data.token);
        this.setState({
          username: res.data.username,
          loginUserName: '',
          loginUserPassword: '',
        })
        this.props.updateAuth(Auth.isUserAuthenticated());
        console.log(this.state)
      }
    }).catch(err => {
      console.log(err);
    })
  }

  handleRegisterSubmit(e) {
    e.preventDefault();
    console.log (
      this.state.registerUserName,
      this.state.registerEmail,
      this.state.registerPassword,
      this.state.registerName,   

    )
    axios.post('auth/register', {
      user: {
      username: this.state.registerUserName,
      email: this.state.registerEmail,
      password: this.state.registerPassword,
      name: this.state.registerName 
    }
    
    }).then(res => {
       console.log(res,'<---res')
      if (res.data.token) {
        console.log(res.data.token)
        Auth.authenticateToken(res.data.token);
        this.props.updateAuth(Auth.isUserAuthenticated());
      }
    }).catch(err => {
      console.log(err);
    })
  }

  handleInputChange(e) {
    const name = e.target.name;
    const value = e.target.value;
    this.setState({
      [name]: value,
    });
  }


  render(){
    const { form }=this.state;
    console.log(form, "***")
    const {loginUsername, loginPassword, registerUsername, registerPassword, registerEmail,registerName }=this.state;
    // const {loginUsername, loginPassword, registerUsername, registerPassword, registerEmail,registerName }=this.props;
  return (
    <div  className='login-container'  style={{ height:window.innerHeight, width:window.innerWidth }}>
      <div  className='login-form-container'>
        <ul className='tab-list'>
          <li className='tab-item-1'>
           <span onClick={ this.toggleForm.bind(this,'LOGIN') }>Login</span>
          </li>
          <li className='tab-item-2'>
            <span onClick={ this.toggleForm.bind(this,'REGISTER') } >Register</span>
          </li>
        </ul>
          {
            form === 'LOGIN' ? (
              <LoginForm
                loginUserName={loginUsername}
                loginPassword={loginPassword}
                handleInputChange={this.handleInputChange.bind(this)}
                handleLoginSubmit={this.handleLoginSubmit.bind(this)}
              />
            ) : form === 'REGISTER' ? (
              <RegisterForm
                registerUserName={registerUsername}
                registerPassword={registerPassword}
                registerEmail={registerEmail}
                registerName={registerName}
                handleInputChange={this.handleInputChange.bind(this)}
                handleRegisterSubmit={this.handleRegisterSubmit.bind(this)}
              />
            ) :  null
          }
      </div>
    </div>
  );
}
};

