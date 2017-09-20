import React, { Component } from 'react';
import ReactDOM from 'react-dom';

import axios from 'axios';
import Session from './Session';
import ContentEditable from './ContentEditable'
import Display from './Display'


class SessionList extends Component {
  constructor() {
    super();
    this.state = {
      apidata:null,
      apidataLoaded:false
    }
    this.renderSaved = this.renderSaved.bind(this); 
 }
 
  componentDidMount() {
     axios(`/rShare/show/${this.props.username}`, {method: 'GET'})
      .then(res => {
         console.log(res.data.data);
        this.setState({
           apidata:res.data.data,
        apidataLoaded:true
        })
      }).catch(function (error) {
        console.log(error);
    });
  }


 renderSaved() {
           console.log('here')
           return this.state.apidata.map((saved_code, index) => {
                 return (  
                        <div className="session-outer" key={index}>    
                                <Session key={saved_code.id} session={saved_code} />
                        </div>
                        );
                     })

                 }

   render() {
           return (
                 <div className="SavedSessions">
                      <h2>Your Saved Peer Coding Sessions</h2>
                      {(this.state.apidataLoaded) ? this.renderSaved() : <p>Loading...</p>}
                 </div>
       )
   }
}

 

export default SessionList;