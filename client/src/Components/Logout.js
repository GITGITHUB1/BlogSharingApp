import React, { useContext, useEffect } from 'react'
import {useNavigate } from 'react-router-dom';
import { context } from '../App';

const Logout = () => {
  const {state,dispatch}=useContext(context);
    const navigate=useNavigate();
    useEffect(()=>{
     fetch('/logout',{
        method:'POST',
        headers:{
            Accept:'application/json',
            "Content-Type":"application/json"
        },
        credentials:"include"
     }).then((res)=>{
        if(res){
            dispatch({type:'USER',payload:'true'})
            navigate('/');
            const alertBox = document.getElementById('alertBox');
            alertBox.innerHTML = `<div class="alert alert-success alert-dismissible fade show" role="alert">
            <strong>Successfully!</strong> Logged Out
            <button type="button" class="close" data-dismiss="alert" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>`;
          setTimeout(()=>{
            alertBox.innerHTML='';
          },3000)
        }
     })
    },[]);

  return (
    <></>
  )
}

export default Logout