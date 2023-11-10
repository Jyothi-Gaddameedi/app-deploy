import React, { useEffect, useRef } from 'react'
import {useDispatch} from "react-redux";

import { Link, useNavigate } from 'react-router-dom';
function Login() {
    let emailInputRef=useRef();
    let passWordInputRef=useRef();
    
    let navigate=useNavigate();
    let dispatch=useDispatch();   
    
    useEffect(()=>{

      validateTokenFromServer();


      // console.log(localStorage.getItem("email"));
      // console.log(localStorage.getItem("passWord"));

      // if(localStorage.getItem("email")&&localStorage.getItem("passWord")){
      //   emailInputRef.current.value=localStorage.getItem("email");
      //   passWordInputRef.current.value=localStorage.getItem("passWord");
      //   validateLoginFromServer();
      // }
      },[]);
      
      let validateTokenFromServer=async()=>{
        
        if(localStorage.getItem("token")){
          let dataToSend=new FormData();
          dataToSend.append("token",localStorage.getItem("token"));
  
          let reqOptions={
            method:"POST",
            body:dataToSend,
          };
          let JSONData=await fetch("http://localhost:1234/validateToken",reqOptions)
          let JSOData=await JSONData.json();
  
          if(JSOData.status==="Failure"){
            alert(JSOData.msg);  
         }else{  
           dispatch({type:"login",data:JSOData.data[0]});
           navigate("/home");
         }
          console.log(JSOData);
        }   
      }

     let validateLoginFromServer=async()=>{
       let dataToSend=new FormData();
       dataToSend.append("email",emailInputRef.current.value);
       dataToSend.append("passWord",passWordInputRef.current.value);
       
       let reqOptions={
        method:"POST",
        body:dataToSend,
       }

      let JSONData= await fetch("http://localhost:1234/validateLogin",reqOptions);
        let JSOData=await JSONData.json();

      if(JSOData.status==="Failure"){
         alert(JSOData.msg);  
      }else{
        // localStorage.setItem("email",emailInputRef.current.value);
        // localStorage.setItem("passWord",passWordInputRef.current.value);

        localStorage.setItem("token",JSOData.token);
        
        console.log(JSOData);

        dispatch({type:"login",data:JSOData.data[0]});
        navigate("/home");
      }
    }
  return (
    <div className='App'>
        <form>
            <h2>Login</h2>
            <div>
                <input type="email" ref={emailInputRef} placeholder='Email'></input>
            </div>
            <div>
                <input type="password" ref={passWordInputRef} placeholder='PassWord'></input>
            </div>
            <div>
                <button type="button"
                  onClick={()=>{
                    validateLoginFromServer();

                  }}
                >Login</button>
            </div>
          </form>
          <br></br>
            <Link to="/signup">Create an account</Link>
          </div>
  )
}

export default Login