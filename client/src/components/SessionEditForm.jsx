import React, { Component } from 'react';
import ContentEditable from './ContentEditable'
import Display from './Display'
import axios from 'axios';

import { Redirect } from 'react-router-dom';

class SessionEditForm extends Component {
  constructor() {
    super();

    this.state = {
        home_user:null,
        peer_user:null,
        code:null,
        updated_code:null,
        fireRedirect: false,
    };
    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleFormSubmit = this.handleFormSubmit.bind(this);
    this.onChange = this.onChange.bind(this);
  }
  
  componentDidMount() {
    axios.get(`/rShare/session/${this.props.match.params.id}`)
      .then((res) => {
        const Session = res.data.data;
        this.setState({
          home_user:res.data.data[0].home_user,
          peer_user:res.data.data[0].peer_user,
          code:res.data.data[0].code
        })
      }).catch(err => console.log(err));
  }

  handleInputChange(e) {
    console.log(e.target.value);
    const name = e.target.name;
    const value = e.target.value;
    this.setState({
      [name]: value,
    });
  }

  handleFormSubmit(e) {
    e.preventDefault();
    axios
      .put(`/rShare/session/${this.props.match.params.id}`, {
         home_user: this.state.home_user,
         peer_user: this.state.peer_user,
         //code: this.state.code
         code: this.state.updated_code
      })
      .then(res => {
          console.log (res + "updated")
        this.setState({
          newId: res.data.data.id,
          fireRedirect: true,
        });
      })
      .catch(err => console.log(err));
    e.target.reset();
  }

  onChange(event){
    console.log( "event.target.value")
    this.setState({updated_code: event.target.value});
    //this.socket.emit('share', {incoming:event.target.value, current:this.state.html})
}


  render() {
    return (
      <div className="edit">
        <form onSubmit={this.handleFormSubmit}>
        <label>
            {/*<input
              type="text"
              placeholder="code"
              name="code"
              value={this.state.code}
              onChange={this.handleInputChange}
            />*/}
          
          </label>
          <ContentEditable onChange={this.onChange} html={this.state.code}/>
          <input type="submit" value="Submit!" />
        </form>
        {this.state.fireRedirect
          ? <Redirect push to={`/session/${this.state.newId}`} />
          : ''}
      </div>
    );
  }
}

export default SessionEditForm;
