import React, { Component } from 'react';
import ReactDOM from 'react-dom'

class Display extends Component {
  constructor() {
    super();
    this.state = {
         playing: false,
    }
  

    this.printInput=this.printInput.bind(this);
    this.insertNodes=this.insertNodes.bind(this);
 }
 componentDidMount() {
    window.addEventListener('load', this.handleLoad);
    const element = ReactDOM.findDOMNode(this);
    console.log(element + "display has loaded");
    //alert(element);
 }
 

 handleLoad() {
  //alert("bobxs1");
 }
 printInput(input){
    console.log("hihihihi"+ input.innerHTML)
 }

 shouldComponentUpdate(nextProps){
     return nextProps.html !== ReactDOM.findDOMNode(this).innerHTML;
    }


  insertNodes(){
     return  this.props.inputHTML.replace(/&lt;/g, '<').replace(/&gt;/g, '>') ;     
  } 

 render() {
    
    return (
     
        <div 
            className="display"  dangerouslySetInnerHTML={{__html:this.insertNodes()} }> 
         </div>
    )
  }
}
 

export default Display;




// https://stackoverflow.com/questions/29527309/react-0-13-this-getdomnode-equivalent-to-react-finddomnode
//https://gist.github.com/girishso/9876306 (contenteditable basecode)