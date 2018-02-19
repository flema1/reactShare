import React, { Component } from 'react';
import ReactDOM from 'react-dom'
// var Prism = require('prismjs');

export default class Display extends Component {
  constructor() {
    super();
    this.state = { }
    this.insertNodes = this.insertNodes.bind(this);
  }

  componentDidMount() {
    window.addEventListener('load', this.handleLoad);
    const element = ReactDOM.findDOMNode(this);
    console.log(element + "display has loaded");
    //alert(element);
  }

  shouldComponentUpdate(nextProps) {
    return nextProps.html !== ReactDOM.findDOMNode(this).innerHTML;
  }

  insertNodes() {
    var latest = "&#x3C;html&#x3E &#x3C;head&#x3E; &#x3C;title&#x3E;getElementById example&#x3C;/title&#x3E; &#x3C;/head&#x3E; &#x3C;body&#x3E;" + this.props.inputHTML + "&#x3C;/body&#x3E";
    var html = latest.replace(/&lt;/g, '<').replace(/&gt;/g, '>');
    html = html.replace(/&#x3C;/g, '<').replace(/&#x3E;/g, '>');
    console.log(typeof html + "bob");
    return html;
    //  var html = Prism.highlight(props.literal, Prism.languages[props.language]);
    //return Prism.highlight(html, Prism.languages.javascript);
  }

  render() {
    return (
        <div style={{height:'100%'}}>
          <div className="display"  dangerouslySetInnerHTML={{__html:this.insertNodes()} }>
          </div>
          {/*<p style={{color: 'red'}} >{eval(5+5)}</p>*/}
        </div>
    )
  }
}


