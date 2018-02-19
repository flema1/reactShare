import React, { Component } from 'react';
import ReactDOM from 'react-dom'
import ReactAce from 'react-ace-editor';
import brace from 'brace';
import AceEditor from 'react-ace';

// var snippetManager = ReactAce.require("ace/snippets").snippetManager;
// snippetManager.insertSnippet(editor, snippet);
class ContentEditable extends Component {
    constructor() {
        super();
        this.state = { }
    }
    componentDidMount() {
        window.addEventListener('load', this.handleLoad);
        const element = ReactDOM.findDOMNode(this);
        console.log(element);
    }

    shouldComponentUpdate(nextProps) {
        var html = ReactDOM.findDOMNode(this).innerHTML;
        if ('text' !== html) {
            //editor.session.insert({row:3, column:3}, 'text')
            // editor.setValue("html");
        }
        return nextProps.html !== ReactDOM.findDOMNode(this).innerHTML;
    }

    onChange(newValue, e) {
        var html = ReactDOM.findDOMNode(this).innerHTML;
        if (this.props.onChange && html !== this.lastHtml) {
            console.log(newValue, e);
            console.log(newValue, e);
            const editor = this.ace.editor;
            //editor.session.insert({row:1,column:5}, this.props.html);
            //editor.setValue(this.props.html, {row:3, column:3});
            editor.session.insert({ row: 1, column: 5 }, this.props.html);
            console.log(editor.session + "kali");

            console.log(editor.getSession().getValue() + "cat");
            console.log(editor.selection.getCursor().row + "getcursor");
            console.log(editor.selection.getCursor().column + "getcursor");
            //editor.session.setValue("html");
            //editor.session.insert({row:10,column:5}, "Just Want To Provide A More Detailed Answer So My Fellows Can Better Visualize It All");

            // The editor object is from Ace's API
            //console.log(editor.getValue()); // Outputs the value of the editor
            //editor.setValue("<h1>hello</h1>", 1) // moves cursor to the start
            //editor.session.insert({row:3, column:3}, 'text')

            this.props.onChange({
                target: {
                    value: editor.getValue()
                }
            });
        }
    }

    // emitChange() {
        // console.log("b-----ob")
        // var html = ReactDOM.findDOMNode(this).innerHTML;
        // if (this.props.onChange && html !== this.lastHtml) {
        //     console.log (html); 
        //      const editor = this.ace.editor; 
        //   editor.session.insert({row:3, column:3}, html)
        //     this.props.onChange({
        //         target: {
        //             value: html
        //         }
        //     });
        // }
        // this.lastHtml = html;
        // console.log (this.lastHtml + "the last hmtl")
        // console.log (typeof this.lastHtml)
    // }

    //  render() {
    //     return (
    //         <p className="editField"
    //             onInput={this.emitChange} 
    //             onBlur={this.emitChange}
    //             contentEditable={'true'}
    //             dangerouslySetInnerHTML={{__html: this.props.html}}></p>
    //     )
    //   }
    // }

    render() {
        return (
            <ReactAce
                className="ace"
                mode="html"
                theme="github"
                onChange={this.onChange.bind(this)}
                ref={instance => { this.ace = instance; }} // Let's put things into scope
                value="#type your code here"
                style={{  height:'100%', width: "100%" }}
            />
    //           <AceEditor
    //   mode="sh"
    //   theme="chrome"
    //   name="code"
    //   width="100%"
    //   maxLines={50}
    //   ref="ace"
    //   fontSize={18}
    //   value="#type your code here"
    //   editorProps={{$blockScrolling: Infinity}}
    //   onLoad={(editor) => {
    //     editor.focus();
    //     editor.getSession().setUseWrapMode(true);
    //   }}
    // />
    );
  }
}


export default ContentEditable;

/*Sources: 
 https://stackoverflow.com/questions/29527309/react-0-13-this-getdomnode-equivalent-to-react-finddomnode
https://gist.github.com/girishso/9876306 (contenteditable basecode)
*/