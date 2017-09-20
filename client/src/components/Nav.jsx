import React from 'react';

import { Link } from 'react-router-dom';
import Auth from '../modules/Auth';

const Nav = (props) => {
  return (
    <header>
      <nav>
        <ul>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
              <Link to="/room">Room</Link>
            </li>
             <li>
              <Link to="/saved">Saved</Link>
            </li>
        </ul>
        {!Auth.isUserAuthenticated() ? (
          <ul>
            <li>
              <Link to="/login">Login</Link>
            </li>
            <li>
              <Link to="/register">Register</Link>
            </li>
          </ul>
        ) : (
          <ul>
            <li>
              <span className="logout" onClick={props.logoutUser}>Log Out</span>
            </li>
          </ul>
        )}
      </nav>
    </header>
  );
};

export default Nav;