import React, { createContext, useReducer } from 'react'
import 'bootstrap/dist/css/bootstrap.css';
import Navbar from './Components/navbar';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from './Components/Home';
import './App.css';
import About from './Components/About';
import Logout from './Components/Logout';
export const context=createContext();
const Routing=()=>{
  return (
    <>
     <Router>
      <Navbar/>
        <div className='container'>
          <Routes>
            <Route exact path="/" element={<Home />}>
            </Route>

            <Route exact path="/about" element={<About/>}>
            </Route>

            <Route exact path="/logout" element={<Logout/>}>
            </Route>
          </Routes>
        </div>
      </Router>

    </>
  )
}
const App = () => {
  const reducer=(state,action)=>{
     if(action.type==='USER'){
      return action.payload;
     }
     return state;
  }
  const [state, dispatch] = useReducer(reducer,true);
  //Send the object which contains state and dispatch as the keys to all the Routes
  return (
    <>
    <context.Provider value={{state,dispatch}}>
       <Routing/>
    </context.Provider>
    </>
    
  )
}

export default App