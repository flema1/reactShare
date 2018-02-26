import React, { Component } from 'react';

import { Link } from 'react-router-dom';
import Auth from '../modules/Auth';
import { slide as Menu } from 'react-burger-menu'
class Nav extends React.Component {

  constructor(props) {
    super(props);

  

    this.displayLogOut= this.displayLogOut.bind(this);
     this.displayLogIn= this.displayLogIn.bind(this);
   
  }
 
  showSettings (event) {
    event.preventDefault();
   
  }
  displayLogIn(){
   if (!Auth.isUserAuthenticated()){

     return  (<ul><li><Link id="home" className="menu-item" to="/login">Login</Link></li>
              <li><Link id="home" className="menu-item"to="/register">Register</Link></li></ul>
             )
   }
  }
   displayLogOut(){
   if (Auth.isUserAuthenticated()){
     return (<ul><li><Link id="home" className="menu-item" to="/room">Code Share</Link>       </li>
        <li><Link id="home" className="menu-item" to="/saved">Saved</Link></li>
         <li><Link id="home" className="menu-item" onClick={this.props.logoutUser}to="/">Log Out</Link></li>
        </ul>
        
             )
  
   }
  }

  render () {
    return (
      <Menu>
        <Link id="home" className="menu-item" to="/">Home</Link>
        {this.displayLogOut()}
        {this.displayLogIn()}
      </Menu>
    );
  }
}

 export default Nav;