import React, { useContext } from 'react'
import image from './images/logo.jpeg'
import { Link } from 'react-router-dom'
import LoginModal from './Modal/loginmodal'
import SignupModal from './Modal/signupmodal'
import { context } from '../App'

const Navbar = () => {
  const {state,dispatch}=useContext(context);
  if(state){
    return (
      <>
      <nav className="navbar navbar-expand-lg navbar-dark bg-primary">
    <img src={image} className="logo" style={{maxWidth:'5%', borderRadius:'51.2rem'}} alt="default"/>
    <Link className="navbar-brand ml-2 display-5" to="/" style={{fontSize:'xx-large'}}>Wisdom_rise_</Link>
    <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
      <span className="navbar-toggler-icon"></span>
    </button>
  
    <div className="collapse navbar-collapse" id="navbarSupportedContent">
      <ul className="navbar-nav ml-auto">
        <li className="nav-item active">
          <Link className="nav-NavLink" to="/"><h4 className='display-6 mx-1'><button type="button" className="btn btn-dark btn-lg">Home</button> </h4><span className="sr-only">(current)</span></Link>
        </li>
        <li className="nav-item active">
          <h4 className='display-6 mx-1'><button type="button" className="btn btn-dark btn-lg" data-toggle="modal" data-target="#loginModal">Login</button></h4>
          <LoginModal/>
        </li>
        <li className="nav-item active">
        <h4 className='display-6 mx-1'><button type="button" className="btn btn-dark btn-lg" data-toggle="modal" data-target="#signupModal">SignUp</button></h4>
          <SignupModal/>
        </li>
          </ul>
    </div>
  </nav>
  <div id="alertBox"></div>
      </>
    )
  }
  else{
    return (
      <>
      <nav className="navbar navbar-expand-lg navbar-dark bg-primary">
    <img src={image} className="logo" style={{maxWidth:'5%', borderRadius:'51.2rem'}} alt="default"/>
    <Link className="navbar-brand ml-2 display-5" to="/" style={{fontSize:'xx-large'}}>Wisdom_rise_</Link>
    <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
      <span className="navbar-toggler-icon"></span>
    </button>
  
    <div className="collapse navbar-collapse" id="navbarSupportedContent">
      <ul className="navbar-nav ml-auto">
        <li className="nav-item active">
          <Link className="nav-NavLink" to="/"><h4 className='display-6 mx-1'><button type="button" className="btn btn-dark btn-lg">Home</button> </h4><span className="sr-only">(current)</span></Link>
        </li>
  
        <li className="nav-item active">
          <Link className="nav-NavLink" to="/logout"><h4 className='display-6 mx-1'><button type="button" className="btn btn-dark btn-lg">Logout</button></h4></Link>
        </li>
          </ul>
    </div>
  </nav>
  <div id="alertBox"></div>
      </>
    )
  }
  
}

export default Navbar