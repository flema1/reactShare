import React from 'react';
import ContentEditable from './ContentEditable'
import DisplaySaved from './DisplaySaved'

import { Link } from 'react-router-dom';

const Session = (props) => {
  var code= props.session.code;
  return (
          <div className="session-inner">
              <h2>{props.session.id}</h2>
              <DisplaySaved  inputHTML={ code }/>
              <Link id ="see-more" to={`/session/${props.session.id}`}>See More</Link>
          </div>
  )
}

export default Session;