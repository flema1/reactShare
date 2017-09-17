import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';


import ReactDOM from 'react-dom'

import {
  LiveProvider,
  LiveEditor,
  LiveError,
  LivePreview
} from 'react-live'

import ContentEditable from './components/ContentEditable'
import Display from './components/Display'
import { EditorState, Editor, convertToRaw } from 'draft-js';

import { convertToJSON } from 'react-json-renderer';

const io = require('socket.io-client')  
const socket = io()  


const Child = React.createClass({
  render: function() {
    
  }
});


const Parent = React.createClass({

  render: function() {

    const childrenWithProps = React.Children.map(this.props.children,
     (child) => React.cloneElement(child, {
      function(child){
        console.log (child)
      }
     })
    );

    return <div>
       <button id="send" onClick= {()=>this.props.handleClick()}>send</button>
      {childrenWithProps}</div>
  }
});
const Text = 'Text'
const View = 'View'
const Welcome = ({ name }) =>
  <View>
    <Text>Welcome {name}!</Text>
  </View>


        // var HelloComponent = React.createClass({
        //     render: function() {
        //         return (
        //             <div>
        //             <h1>Hello, World!</h1>
        //             <ContentEditable>
        //             </ContentEditable>
        //               </div>
        //         )
        //     }
        // })


class App extends Component {
 constructor(props) {
    super(props);
     this.state = {
         //playing: false,
         html:'&lt;h1&gt;Display Box&lt;h1&gt'

    }
    this.handleLoad = this.handleLoad.bind(this);
    this.onChange = this.onChange.bind(this);
    this.update= this.update.bind(this);
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
  // var socket = io();
  //       let textArea = document.querySelector("textarea");
        
       
  //         var textToSend = textArea.value;
  //         console.log("send " + textToSend + " to server");
  //         socket.emit("send", textToSend);
        
        
  //       socket.on("message-from-friend", function(text) {
  //         alert(text);
  //       });
      
}
 update()
{
  // var textarea = window.editbox.document.f.ta;
  // var d = ReactDOM.findDOMNode('frame')
  //.document.dynamicframe.document; 
  //console.log(d+"in");
    // d.open();
    // d.write(<h1>hello hello hello</h1>);
    // d.close();
}



  render() {

    
    return (
      <div className="App">
        <div >
          {/*<img src={logo} className="App-logo" alt="logo" />*/}
          {/*<h2>Welcome to React</h2>*/}
        </div>
        <p className="App-intro">
          {/*<h1>React MusicPlayer</h1>*/}
        </p>
        {/*<div className="player_container">*/}
            {/*<img className="album_cover" src="http://myegy.tv/files/img/content/3/736/1495064508.500_1000.jpg"/>*/}
           
          
             
               {/*<PlayButton/>*/}
           
                        
        {/*</div>*/}
          {/*<textarea>type here</textarea>*/}
          {/*<button id="send" onClick= {()=>this.handleClick()}>send</button>*/}
        {/*<LiveProvider >
    
        {console.log (<LiveEditor/>)}
        {console.log (<LivePreview />)}

          <LiveEditor />

        

       <Parent handleClick={this.handleClick}>
          {/*<Child value="1" />*/}
           {/*<Child value="2" />
            <Child value="3" />
            <Child value="4" />
           <Child value="5" />
            <Child value="6" />*/}
            
       {/*</Parent>
        <LivePreview />
     
        <LiveError />*/}
       
        {/*</LiveProvider>*/}
      

     
  
      {/*<div id="editbox">
        </div>
      <div id="display">
        </div>*/}
        <div>
        <ContentEditable onChange={this.onChange}/>
        </div>
         <Display inputHTML={this.state.html}/>
       
        {/*<frame  id="dynamicframe" name="dynamicframe" src="javascript:'';" width="100px"/>*/}
        {/*{this.update()}*/}
       
       

       
        
         
      </div>
    );
  }
}






export default App;

