
import React, { Component } from 'react';


class Home extends Component {


constructor(){
    super();
   
  }
  

  render(){
    return (
               
      //  <div>
      // <div className="home">
      //    <img className="logo" src={logo}/>
      //    <p className="logo2">code anywhere</p>
      //    {/*<div className="bob"></div>*/}
      // </div>
      
      //  </div>
      <div className={'home-container'}>
        <div className={'left'}>
          <div  className={'brand-container'}>
  

          <h1>Code Share</h1>
          <div className={'verticle'}></div>
          <h3>better dev team coding</h3></div>
        {/*<div className={'right'}>

        </div>*/}
        
        
      
        </div>
          {/*<div>
            <img src={'https://cdn0.iconfinder.com/data/icons/web-development-2/512/webpage_coding_web_programming_html_script_php_code_website_application_java_css_development_editor_flat_design_icon-512.png'} width='70px'
         alt="boohoo" className="img-responsive"/>
         </div>*/}

      </div>
    )
  }

}
export default Home 