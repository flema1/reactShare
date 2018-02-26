import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import ReactDOM from 'react-dom'
import axios from 'axios';
import Auth from './modules/Auth';
import Nav from './components/Nav';
import MainForm from './components/MainForm';
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
      username:'',
    };

    this.logoutUser = this.logoutUser.bind(this);
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

updateAuth(token){
   this.setState({
         auth: token
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
              <Nav className='nav'logoutUser={this.logoutUser} />
                {/*Logged in as: {this.state.username}*/}
              <Route exact path="/" component={Home}/>
              <Route exact path="/login"
                render={() =>
                  !this.state.auth ? (
                    <MainForm
                      updateAuth={this.updateAuth.bind(this)}
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
          </div>
    </Router>
    );
  }
}


export default App;

