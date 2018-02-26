import React, { Component } from 'react';

import { Link } from 'react-router-dom';
import Auth from '../modules/Auth';
import { slide as Menu } from 'react-burger-menu'
class Nav extends React.Component {

  constructor(props) {
    super(props);

  

    this.displayLogOut= this.displayLogOut.bind(this);
     this.displayLogIn= this.displayLogIn.bind(this);
   
  }
 
  showSettings (event) {
    event.preventDefault();
   
  }
  displayLogIn(){
   if (!Auth.isUserAuthenticated()){

     return  (<ul><li><Link id="home" className="menu-item" to="/login">Login</Link></li>
              <li><Link id="home" className="menu-item"to="/register">Register</Link></li></ul>
             )
   }
  }
   displayLogOut(){
   if (Auth.isUserAuthenticated()){
     return (<ul><li><Link id="home" className="menu-item" to="/room">Code Share</Link>       </li>
        <li><Link id="home" className="menu-item" to="/saved">Saved</Link></li>
         <li><Link id="home" className="menu-item" onClick={this.props.logoutUser}to="/">Log Out</Link></li>
        </ul>
        
             )
  
   }
  }

  render () {
    return (
      <Menu>
        <Link id="home" className="menu-item" to="/">Home</Link>
        {this.displayLogOut()}
        {this.displayLogIn()}
      </Menu>
    );
  }
}

 export default Nav;
// class Nav extends Component {
//  constructor(props) {
//     super(props);
    
//  }



//   showSettings= (event)=> {
//     event.preventDefault();
//     // .
//     // .
//     // .
//   }

//   render () {
//    return (
//     <header>
//       <nav className="main-nav">
//         <div className="sub-nav">
//         <ul className="nav-ul">
//           <li id="home" className="menu-item">
//             <Link to="/">Home</Link>
//           </li>

          
//           <li>
//               <Link to="/room">Code Share</Link>
//             </li>
//              <li>
//               <Link to="/saved">Saved</Link>
//             </li>
//         </ul>
//         {!Auth.isUserAuthenticated() ? (
//           <ul className="nav-ul">
//             <li>
//               <Link to="/login">Login</Link>
//             </li>
//             <li>
//               <Link to="/register">Register</Link>
//             </li>
//           </ul>
//         ) : (
//           <ul className="log-out">
//             <li>
//               <span className="logout" onClick={this.props.logoutUser}>Log Out</span>
//             </li>
//           </ul>
//         )}
//         </div>
//       </nav>
//     </header>
//   );
//   }
// }

// // const Nav = (props) => {
// //   return (
// //     <header>
// //       <nav className="main-nav">
// //         <div className="sub-nav">
// //         <ul className="nav-ul">
// //           <li>
// //             <Link to="/">Home</Link>
// //           </li>
// //           <li>
// //               <Link to="/room">Code Share</Link>
// //             </li>
// //              <li>
// //               <Link to="/saved">Saved</Link>
// //             </li>
// //         </ul>
// //         {!Auth.isUserAuthenticated() ? (
// //           <ul className="nav-ul">
// //             <li>
// //               <Link to="/login">Login</Link>
// //             </li>
// //             <li>
// //               <Link to="/register">Register</Link>
// //             </li>
// //           </ul>
// //         ) : (
// //           <ul className="log-out">
// //             <li>
// //               <span className="logout" onClick={props.logoutUser}>Log Out</span>
// //             </li>
// //           </ul>
// //         )}
// //         </div>
// //       </nav>
// //     </header>
// //   );
// // };

// // export default Nav;
// export default Nav;