import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import ReactDOM from 'react-dom'
//import { subscribeToTimer } from './components/api';
import { messenger } from './components/api2';

import ContentEditable from './components/ContentEditable'
import Display from './components/Display'
// const io = require('socket.io-client')  
// const socket = io()  



class App extends Component {
 constructor(props) {
    super(props);
  //    subscribeToTimer((err, timestamp) => this.setState({ 
  //   timestamp 
  // }));
    
    

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
  alert("bob");
 }
 onChange(event){
    console.log( "event.target.value")
    this.setState({html: event.target.value});
    console.log (this.state.html + "www")
}



handleClick(){

        let textArea = document.querySelector("textarea");
        var textToSend = textArea.value;
         messenger(textToSend);       
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

