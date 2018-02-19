import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import ContentEditable from './ContentEditable'
import Display from './Display'
import ReactAce from 'react-ace-editor';
import logo from './peer.png';
import axios from 'axios';
import io from 'socket.io-client';

export default class Room extends Component {
  constructor(props) {
    super(props);
    this.socket = io();
    // this.socket.on("message-from-friend", function (text) {
    //   console.log('from server', text)
    // });

    // this.socket.on("share-from-peer", function (code) {
    //   console.log('from share', code)
    // });

    this.socket.on("share-from-peer", (code) => this.setState({
      shared_code: code,
      html: code
    }));

    this.state = {
      html: "",
      timestamp: 'no timestamp yet',
      shared_code: '',
      finalHTML: 'null',
      fireRedirect: false,
      username: this.props.username,
      width: window.innerWidth,
      height: window.innerHeight
    }
  }

  // Add event listener
  componentDidMount() {
    this.updateDimensions();
    window.addEventListener("resize", this.updateDimensions.bind(this));
  }

  //Remove event listener
  componentWillUnmount() {
    window.removeEventListener("resize", this.updateDimensions.bind(this));
  }

  updateDimensions() {
    // if(window.innerWidth < 500) {
    //   this.setState({ width: 450, height: 102 });
    // } else {
    let update_width = window.innerWidth;
    let update_height = window.innerHeight;
    this.setState({ width: update_width, height: update_height });
  }

  onChange(event) {
    this.setState({ html: event.target.value });
    this.socket.emit('share', { incoming: event.target.value, current: this.state.html })
  }

  handleClick() {
    let textArea = document.querySelector("textarea");
    var textToSend = textArea.value;
    console.log("sending");
    this.socket.emit('send', textToSend)
  }

  handleClickSave() {
    console.log("save save");
    axios.post('/rShare/save', { //<-- objrect sent to the backend for saving  
      home_user: this.props.username,
      peer_user: 'Flintstone',
      code: this.state.html
    })
    .then(res => {
      console.log(res + "saved")
      this.setState({
        fireRedirect:true,
      });
    })
    .catch(err => console.log(err));
  }
  render() {
    console.log(this.state.width, " ", this.state.height);
    const {width, height}= this.state; 
    return (
      // <div className="room">
      //     <ContentEditable onChange={this.onChange} html={this.state.shared_code}/>
      //     {/*<div id="aceEditor" style="height: 500px; width: 500px">some text</div>*/}
      //     <Display inputHTML={ this.state.html }/> 
      //     <button onClick= {()=> this.handleClickSave()}>Save</button>
      //     {this.state.fireRedirect ? <Redirect push to={'/saved'} /> : ''}
      // </div>

      <div  className='session-container'  style={{ height:height, width:width }}>
        <div  className='interface-container' style={{  width: (width*.80), height: (height) }}>
          <div className='display-container' style={{ height: (height*.40) }}>
            <ContentEditable onChange={this.onChange.bind(this)} html={this.state.shared_code}/>
          </div>
          <div  className='display-container' style={{ height: (height*.40) }}>
            <Display inputHTML={ this.state.html }/> 
          </div>
          <button onClick= { this.handleClickSave.bind(this) }>Save</button>
          {this.state.fireRedirect ? <Redirect push to={'/saved'} /> : ''}
        </div>
      </div>
    )
  }
}

