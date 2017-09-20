import React, { Component } from 'react';

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
         shared_code:'null',
         finalHTML: 'null'

    }

    //this.handleLoad = this.handleLoad.bind(this);
    this.onChange = this.onChange.bind(this);
    this.handleClick= this.handleClick.bind(this);
    this.handleClickSave= this.handleClickSave.bind(this);
    //this.handleClickShow= this.handleClickShow.bind(this);
    this.code= this.code.bind(this);
    
 }

  //componentDidMount() {
 
  //}
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


handleClickSave(){
 console.log("save save");
  axios.post('/rShare/save', {
    home_user: '100',
    peer_user: 'Flintstone',
    code: this.state.html
  })
  .then(function (res) {
    console.log(res);
  })
  .catch(function (error) {
    console.log(error);
  });

}
// handleClickShow(){
//  console.log("show show");
//   axios.get('/rShare/show/100')
//   .then(function (res) {
//     console.log(res.data);
//     this.setState({
//       apidata:"array",
//       loaded:true,
//       currentPage:'results',
//       _redirect:true
//     })
//   })
//   .catch(function (error) {
//     console.log(error);
//   });

// }

code(){
  this.setState({
    finalHTML:this.state.html+ this.state.shared_code
  })
   
}


  render() {
    return (
      <div className="">
          {/*<textarea>type here</textarea>
          <button id="send" onkeyup= {()=>this.handleClick()}>send</button>
          <button onClick= {() => this.props.handleClickShow()}>Show</button>*/}
          
          <ContentEditable onChange={this.onChange} html={this.state.shared_code}/>
          <Display inputHTML={ this.state.html }/> 
          {/*This is the timer value: {this.state.shared_code.replace(/&lt;/g, '<').replace(/&gt;/g, '>') }*/}
             <button onClick= {()=> this.handleClickSave()}>Save</button>
      </div>
 
    )
  }
}

export default Room;