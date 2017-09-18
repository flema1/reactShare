import React, { Component } from 'react';
import ReactDOM from 'react-dom'

class ContentEditable extends Component {
  constructor() {
    super();
    this.state = {
         playing: false,
    }
  
    this.emitChange = this.emitChange.bind(this);
    this.handleLoad = this.handleLoad.bind(this);
 }
 componentDidMount() {
    window.addEventListener('load', this.handleLoad);
    const element = ReactDOM.findDOMNode(this);
    console.log(element);
    //alert(element);
 }
 

 handleLoad() {
  //alert("bobxs1");
 }

 shouldComponentUpdate(nextProps){
        return nextProps.html !== ReactDOM.findDOMNode(this).innerHTML;
    }

    emitChange(){
        var html = ReactDOM.findDOMNode(this).innerHTML;
        // var d = document.createElement('h1').innerHTML
        // d= ReactDOM.findDOMNode(this)
        // console.log(d.firstChild);
        // //var p= document.createElement(d.firstChild)
        // //console.log (html.toHtmlObject);
        // // var children = element.childNodes;
        // var children = d.childNodes;
        // children.forEach(function(item){
        // console.log(item.firstChild);
        // });
        // console.log (ReactDOM.findDOMNode(this).children)

        if (this.props.onChange && html !== this.lastHtml) {
            //console.log (html); 


//              var wrapper= document.createElement('div');
// wrapper.innerHTML= html;
// var div= wrapper.childNodes


            this.props.onChange({
                target: {
                    value: html
                }
            });
        }


        this.lastHtml = html;
        console.log (this.lastHtml + "the last hmtl")
        console.log (typeof this.lastHtml)
    }
    

   
 render() {
    return (
        <p className="editField"
            onInput={this.emitChange} 
            onBlur={this.emitChange}
            contentEditable={'true'}
            dangerouslySetInnerHTML={{__html: this.props.html}}></p>
    )
  }
}
 

export default ContentEditable;
/*Sources: 
 https://stackoverflow.com/questions/29527309/react-0-13-this-getdomnode-equivalent-to-react-finddomnode
https://gist.github.com/girishso/9876306 (contenteditable basecode)
*/