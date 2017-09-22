import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import ContentEditable from './ContentEditable'
import Display from './Display'
import io from 'socket.io-client';
import axios from 'axios';

class Room extends Component {
 constructor(props) {
    super(props);
    
     this.socket = io('http://localhost:3001');
     this.socket.on("message-from-friend", function(text){
      console.log('from server', text)
    });
    
    this.socket.on("share-from-peer", function(code){
      console.log('from share', code)
      
    });
     
    this.socket.on("share-from-peer",(code) => this.setState({ 
     shared_code:code,
     html:code
     }));

     this.state = {
         html:'&lt;h1&gt;Display Box&lt;h1&gt',
         timestamp: 'no timestamp yet',
         shared_code:'',
         finalHTML: 'null',
         fireRedirect: false,
         username:this.props.username
    }

    this.onChange = this.onChange.bind(this);
    this.handleClick= this.handleClick.bind(this);
    this.handleClickSave= this.handleClickSave.bind(this);
 }

onChange(event){
    this.setState({html: event.target.value});
    this.socket.emit('share', {incoming:event.target.value, current:this.state.html})
}

handleClick(){
        let textArea = document.querySelector("textarea");
        var textToSend = textArea.value;
        console.log("sending");
        this.socket.emit('send', textToSend)
}


handleClickSave(){
 console.log("save save");
  axios.post('/rShare/save', { //<-- objrect sent to the backend for saving  
    home_user: this.props.username,
    peer_user: 'Flintstone',
    code: this.state.html
  }).then(res => {
        console.log (res + "saved")
        this.setState({
          fireRedirect: true,
        });
      })
      .catch(err => console.log(err));
  }


  render() {
    return (
      <div className="room">          
          <ContentEditable onChange={this.onChange} html={this.state.shared_code}/>
          <Display inputHTML={ this.state.html }/> 
          <button onClick= {()=> this.handleClickSave()}>Save</button>
          {this.state.fireRedirect ? <Redirect push to={'/saved'} /> : ''}
      </div>
    )
  }
}

export default Room;