import React from 'react';
import ContentEditable from './ContentEditable'
import DisplaySaved from './DisplaySaved'

import { Link } from 'react-router-dom';

const Session = (props) => {
  var code= props.session.code;
  return (
    <div >

      <h2>{props.session.id}</h2>
      {/*<h2>{props.session.code}</h2>*/}
        <DisplaySaved  inputHTML={ code }/>
    
      <Link to={`/session/${props.session.id}`}>See More</Link>
    </div>
  )
}

export default Session;