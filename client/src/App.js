import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import ReactDOM from 'react-dom'
//import { subscribeToTimer } from './components/api';
// import { messenger } from './components/api2';

import ContentEditable from './components/ContentEditable'
import Display from './components/Display'
import io from 'socket.io-client';
    var __lastHTML="null";




class App extends Component {
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
         shared_code:'null',
         finalHTML: 'null'

    }

    this.handleLoad = this.handleLoad.bind(this);
    this.onChange = this.onChange.bind(this);
    this.handleClick= this.handleClick.bind(this);
    this.code= this.code.bind(this);
    
 }

 componentDidMount() {
    window.addEventListener('load', this.handleLoad);
 }

 handleLoad() {
  //alert("bob");
 }
 onChange(event){
 
    //console.log( "event.target.value")
    this.setState({html: event.target.value});
//if (this.state.html!=__lastHTML){
 this.socket.emit('share', {incoming:event.target.value, current:this.state.html})
  //  __lastHTML=this.state.html;
  //  alert( __lastHTML.replace(/&lt;/g, '<').replace(/&gt;/g, '>'));
//}
    
   // console.log (this.state.html + "www")
}



handleClick(){
        let textArea = document.querySelector("textarea");
        var textToSend = textArea.value;
        console.log("sending");
        this.socket.emit('send', textToSend)
        //  messenger(textToSend);       
}
code(){
  this.setState({
    finalHTML:this.state.html+ this.state.shared_code
  })
   
}

  render(){
    return (
      <div className="App">
          <textarea>type here</textarea>
          <button id="send" onkeyup= {()=>this.handleClick()}>send</button>

          <ContentEditable onChange={this.onChange} html={this.state.shared_code}/>
          <Display inputHTML={
            //this.state.finalHTML
            this.state.html
            //this.code()
            //this.state.shared_code.replace(/&lt;/g, '<').replace(/&gt;/g, '>')
            }/> 
          This is the timer value: {this.state.shared_code.replace(/&lt;/g, '<').replace(/&gt;/g, '>') }
      </div>
    );
  }
}






export default App;

