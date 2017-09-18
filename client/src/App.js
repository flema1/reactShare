import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import ReactDOM from 'react-dom'
//import { subscribeToTimer } from './components/api';
// import { messenger } from './components/api2';

import ContentEditable from './components/ContentEditable'
import Display from './components/Display'
import io from 'socket.io-client';
  




class App extends Component {
 constructor(props) {
    super(props);
    
      this.socket = io('http://localhost:3001');
     this.socket.on("message-from-friend", function(text){
      console.log('from server', text)
      });

     this.state = {
         html:'&lt;h1&gt;Display Box&lt;h1&gt',
         timestamp: 'no timestamp yet'
    }

    this.handleLoad = this.handleLoad.bind(this);
    this.onChange = this.onChange.bind(this);
    this.handleClick= this.handleClick.bind(this);
    
 }

 componentDidMount() {
    window.addEventListener('load', this.handleLoad);
 }

 handleLoad() {
  //alert("bob");
 }
 onChange(event){
   
    console.log( "event.target.value")
    this.setState({html: event.target.value});
    console.log (this.state.html + "www")
}



handleClick(){
        let textArea = document.querySelector("textarea");
        var textToSend = textArea.value;
        this.socket.emit('send', textToSend)
        //  messenger(textToSend);       
}


  render(){
    return (
      <div className="App">
          <textarea>type here</textarea>
          <button id="send" onClick= {()=>this.handleClick()}>send</button>

          <ContentEditable onChange={this.onChange}/>
          <Display inputHTML={this.state.html}/> 
          This is the timer value: {this.state.timestamp}
      </div>
    );
  }
}






export default App;

