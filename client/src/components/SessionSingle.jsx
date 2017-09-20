import React, { Component } from 'react';
import DisplaySaved from './DisplaySaved'
import axios from 'axios';

import { Link, Redirect } from 'react-router-dom';

class SessionSingle extends Component {
  constructor() {
    super();
    this.state = {
      session: null,
      apiDataLoaded: false,
      fireRedirect: false,
    }
    this.deletesession = this.deletesession.bind(this);
  }

  componentDidMount() {
    axios.get(`/rShare/session/${this.props.match.params.id}`)
      .then(res => {
          console.log (res.data.data )
        this.setState({
          apiDataLoaded: true,
          session: res.data.data[0],
        })
      }).catch(err => console.log(err));
  }

  deletesession() {
      console.log('delete')
    axios.delete(`/rShare/session/${this.props.match.params.id}`) 
      .then(res => {
        console.log(res);
        this.setState({
          fireRedirect: true,
        });
      }).catch(err => {
        console.log(err);
      });
  }

  rendersessionOrLoading() {
    if (this.state.apiDataLoaded) {
      return (
        <div className="inner">
          
          <div className="info">
         
            <h1>home user: {this.state.session.home_user}</h1>
            {/*<p> code: {this.state.session.code}</p>*/}
              <DisplaySaved  className="display" inputHTML={ this.state.session.code }/>
            
            <div className="links">
         
              <Link to={`/edit/${this.props.match.params.id}`}>Edit</Link>
              <span onClick={this.deletesession}>Delete</span>
              {this.state.fireRedirect
                ? <Redirect push to="/session" />
                : ''}
            </div>
          </div>
        </div>
      )
    } else return <p className="loading">Loading...</p>
  }


  render() {
    return (
      <div className="session-single">
        {this.rendersessionOrLoading()}
     
           
      </div>
    )
  }
}

export default SessionSingle;