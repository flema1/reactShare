import React, { Component } from 'react';
import ReactDOM from 'react-dom'

class ContentEditable extends Component {
  constructor() {
    super();
    this.state = {
        //  playing: false,
    }
  
    this.emitChange = this.emitChange.bind(this);
    this.handleLoad = this.handleLoad.bind(this);
 }
 componentDidMount() {
    window.addEventListener('load', this.handleLoad);
    const element = ReactDOM.findDOMNode(this);
    console.log(element);

 }
 

 handleLoad() {
  //alert("bobxs1");
 }

 shouldComponentUpdate(nextProps){
        return nextProps.html !== ReactDOM.findDOMNode(this).innerHTML;
    }

    emitChange(){
        var html = ReactDOM.findDOMNode(this).innerHTML;
        if (this.props.onChange && html !== this.lastHtml) {
            console.log (html); 
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