import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import ReactDOM from 'react-dom'
import axios from 'axios';

import Auth from './modules/Auth';
import Nav from './components/Nav';
import LoginForm from './components/LoginForm';
import RegisterForm from './components/RegisterForm';
import Room from './components/Room';
import Home from './components/Home'
import SessionList from './components/SessionList';
import SessionSingle from './components/SessionSingle';
import SessionEditForm from './components/SessionEditForm';
import ContentEditable from './components/ContentEditable'
import Display from './components/Display';

import {
  BrowserRouter as
  Router,
  Link,
  Route,
  Redirect,
} from 'react-router-dom';

import io from 'socket.io-client';
var __lastHTML="null";




class App extends Component {

    constructor(props) {
    super(props);

    this.state = {
      auth: Auth.isUserAuthenticated(),
      shouldFireRedirect: false,
      loginUserName: '',
      loginPassword: '',
      registerUserName: '',
      registerPassword: '',
      registerEmail: '',
      registerName: '',
      username:'',
    };

    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleLoginSubmit = this.handleLoginSubmit.bind(this);
    this.logoutUser = this.logoutUser.bind(this);
    this.handleRegisterSubmit = this.handleRegisterSubmit.bind(this);
    this.resetFireRedirect = this.resetFireRedirect.bind(this);
  }
 
 componentDidMount() {
    window.addEventListener('load', this.handleLoad);

    if (this.state.auth){
      axios.post('/rShare/username',{
      token:Auth.getToken()
    }).then(res => {
      console.log(res.data.data.username + "username");
      this.setState({
          username: res.data.data.username,
        })
    }).catch(err => {
      console.log(err);
    })
    }
 }


handleInputChange(e) {
    const name = e.target.name;
    const value = e.target.value;
    this.setState({
      [name]: value,
    });
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
          auth: Auth.isUserAuthenticated(),
          username: res.data.username,
          loginUserName: '',
          loginUserPassword: '',
        })
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
        this.setState({
          auth: Auth.isUserAuthenticated(),
        })
      }
    }).catch(err => {
      console.log(err);
    })
  }



  resetFireRedirect() {
    if (this.state.shouldFireRedirect) {
      this.setState({
        shouldFireRedirect: false,
      })
    }
  }

  logoutUser() {
    axios.delete('auth/logout', {
      headers: {
        'Authorization': `Token ${Auth.getToken()}`,
        token: Auth.getToken(),
      }

    }).then(res => {
      console.log (res + "response");
      Auth.deauthenticateUser();
      this.setState({
        auth: Auth.isUserAuthenticated(),
        loginUserName: '',
        loginUserPassword: '',
      })
    })
  }

  render(){
    return (
      <Router>
          <div className="App">
              <Nav logoutUser={this.logoutUser} />
                {/*Logged in as: {this.state.username}*/}
              <Route exact path="/" component={Home}/>
              <Route exact path="/login"
                render={() =>
                  !this.state.auth ? (
                    <LoginForm
                      auth={this.state.auth}
                      loginUserName={this.state.loginUsername}
                      loginPassword={this.state.loginPassword}
                      handleInputChange={this.handleInputChange}
                      handleLoginSubmit={this.handleLoginSubmit}
                    />
                  ) : (
                    <Redirect to="/room" component={Room}/>
                  )}
              />
              <Route
                exact
                path="/room"
                render={() =>
                  this.state.auth ? (
                    <Room shouldFireRedirect={this.state.shouldFireRedirect}
                      handleClickShow={this.handleClickShow}
                      username={this.state.username}  
                    />
                  ) : (
                    <Redirect to="/login" />
                  )}
              />
            
              <Route exact path="/session/:id" component={SessionSingle} />
              <Route exact path="/edit/:id" component={SessionEditForm} />
              <Route
                exact
                path="/saved"
                render={() =>
                  this.state.auth ? (
                    <SessionList  username={ this.state.username}/>
                  ) : (
                    <Redirect to="/login" />
                  )}
              />

              <Route
                exact
                path="/register"
                render={() =>
                  !this.state.auth ? (
                    <RegisterForm
                      auth={this.state.auth}
                      registerUserName={this.state.registerUsername}
                      registerPassword={this.state.registerPassword}
                      registerEmail={this.state.registerEmail}
                      registerName={this.state.registerName}
                      handleInputChange={this.handleInputChange}
                      handleRegisterSubmit={this.handleRegisterSubmit}
                    />
                  ) : (
                    <Redirect to="/dash" />
                  )}
              />
            
          </div>
    </Router>
    );
  }
}


export default App;

