import React, { useRef, useState } from 'react'
import { Link } from 'react-router-dom';

function SignUp() {
let firstNameInputRef=useRef();
let lastNameInputRef=useRef();
let emailInputRef=useRef();
let passWordInputRef=useRef();
let ageInputRef=useRef();
let profilePicInputRef=useRef();
let [profilePicURL,setProfilePicURL]=useState("./images/Profile-pic.jpg");

let sendSignUpDataToServerFormData=async()=>{
    let dataToSend=new FormData();
      dataToSend.append("firstName",firstNameInputRef.current.value);
      dataToSend.append("lastName",lastNameInputRef.current.value);
      dataToSend.append("email",emailInputRef.current.value);
      dataToSend.append("passWord",passWordInputRef.current.value);
      dataToSend.append("age",ageInputRef.current.value);

      for(let i=0;i<profilePicInputRef.current.files.length;i++)
      dataToSend.append("profilePic" ,profilePicInputRef.current.files[i]);

  let reqOptions={
      method:"POST",
      body:dataToSend,
  };

  let JSONData=await fetch("http://localhost:1234/signup",reqOptions);
  let JSOData=await JSONData.json();

  alert(JSOData.msg);

  console.log(JSOData); 
  };

  return (
    <div className='App'>
        <form>
            <h2>Sign Up</h2>
            <div>
                <label>First Name</label>
                <input ref={firstNameInputRef}></input>
            </div>
            <div>
                <label>Last Name</label>
                <input ref={lastNameInputRef}></input>
            </div>
            <div>
                <label>Email</label>
                <input type="email" ref={emailInputRef}></input>
            </div>
            <div>
                <label>PassWord</label>
                <input type="password" ref={passWordInputRef}></input>
            </div>
            <div>
                <label>Age</label>
                <input type="number" ref={ageInputRef}></input>
            </div>
            <div>
                <label>Profile Pic</label>
                <input ref={profilePicInputRef} type="file"
                onChange={()=>{
                  let selectedImageURL=URL.createObjectURL(profilePicInputRef.current.files[0])

                  setProfilePicURL(selectedImageURL)
                }}
                ></input>
                <br/>
                <br/>
                <img className="profilePriview" src={profilePicURL}></img>
            </div>
            <div>
                <button type="button" 
                onClick={()=>{
                   sendSignUpDataToServerFormData();
                }}
                >Sign Up(Form Data)</button>
            </div>
        </form>
        <br></br>
        <Link to="/">Login</Link>


    </div>
  )
}

export default SignUp