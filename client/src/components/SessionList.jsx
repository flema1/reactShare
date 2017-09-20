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

    axios('/rShare/show/100', {method: 'GET'})
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
                   <div key={index}>    
                       
                       {/*<h3>{saved_code.id} </h3>
                        <h3>{saved_code.code} </h3>*/}
                      
                       {/* <button onClick= {()=>this.handleClickSave()}>Save</button> */}
                          <Session key={saved_code.id} session={saved_code} />
                   </div>
                        );
                     })

                 }

   render() {
           return (
                 <div className="searchpage">
                  <h2>Your Saved Peer Coding Sessions</h2>
                     {(this.state.apidataLoaded) ? this.renderSaved() : <p>Loading...</p>}
                 </div>
       )
   }
}

 

export default SessionList;