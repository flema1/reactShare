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

 }
 

 handleLoad() {
  alert("bobxs1");
 }
 printInput(input){
    console.log("hihihihi"+ input.innerHTML)
 }

 shouldComponentUpdate(nextProps){

     return nextProps.html !== ReactDOM.findDOMNode(this).innerHTML;
    }

    // emitChange(){
    //     var html = ReactDOM.findDOMNode(this).innerHTML;
    //     var d = document.createElement('h1').innerHTML
    //     d= ReactDOM.findDOMNode(this)
    //     console.log(d.firstChild);
    //     //var p= document.createElement(d.firstChild)
    //     //console.log (html.toHtmlObject);
    //     // var children = element.childNodes;
    //     var children = d.childNodes;
    //     children.forEach(function(item){
    //     console.log(item.firstChild);
    //     });
    //     console.log (ReactDOM.findDOMNode(this).children)
    //     if (this.props.onChange && html !== this.lastHtml) {
    //         console.log (html); 
    //         this.props.onChange({
    //             target: {
    //                 value: html
    //             }
    //         });
    //     }
    //     this.lastHtml = html;
    // }
    




  insertNodes(){
        // var div = document.createElement('div');
        //     div.innerHTML = this.props.inputHTML; // HTML string HTML
        // console.log (div) 
      
     return  this.props.inputHTML/*.replace(/&lt;/g, '<').replace(/&gt;/g, '>') ;*/;
       

        
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