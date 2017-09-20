import React from 'react';

import { Link } from 'react-router-dom';
import Auth from '../modules/Auth';

const Nav = (props) => {
  return (
    <header>
      <nav className="main-nav">
        <div className="sub-nav">
        <ul className="nav-ul">
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
              <Link to="/room">Code Share</Link>
            </li>
             <li>
              <Link to="/saved">Saved</Link>
            </li>
        </ul>
        {!Auth.isUserAuthenticated() ? (
          <ul className="nav-ul">
            <li>
              <Link to="/login">Login</Link>
            </li>
            <li>
              <Link to="/register">Register</Link>
            </li>
          </ul>
        ) : (
          <ul className="log-out">
            <li>
              <span className="logout" onClick={props.logoutUser}>Log Out</span>
            </li>
          </ul>
        )}
        </div>
      </nav>
    </header>
  );
};

export default Nav;