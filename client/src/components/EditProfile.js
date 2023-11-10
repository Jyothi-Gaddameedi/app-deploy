import React, { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom';
import TopNavigation from './TopNavigation';
import { useSelector } from 'react-redux';

function EditProfile() {
let firstNameInputRef=useRef();
let lastNameInputRef=useRef();
let emailInputRef=useRef();
let passWordInputRef=useRef();
let ageInputRef=useRef();
let profilePicInputRef=useRef();
let [profilePicURL,setProfilePicURL]=useState("./images/Profile-pic.jpg");

let storeObj=useSelector((store)=>{
   return store;
});

useEffect(()=>{
firstNameInputRef.current.value=storeObj.loginDetails.firstName;
lastNameInputRef.current.value=storeObj.loginDetails.lastName;
emailInputRef.current.value=storeObj.loginDetails.email;
ageInputRef.current.value=storeObj.loginDetails.age;
setProfilePicURL(`http://localhost:1234/${storeObj.loginDetails.profilePic}`)
},[]);

let sendUpdatedDataToServerFormData=async()=>{
    let dataToSend=new FormData();
      dataToSend.append("firstName",firstNameInputRef.current.value);
      dataToSend.append("lastName",lastNameInputRef.current.value);
      dataToSend.append("email",emailInputRef.current.value);
      dataToSend.append("passWord",passWordInputRef.current.value);
      dataToSend.append("age",ageInputRef.current.value);

      for(let i=0;i<profilePicInputRef.current.files.length;i++)
      dataToSend.append("profilePic" ,profilePicInputRef.current.files[i]);

  let reqOptions={
      method:"PATCH",
      body:dataToSend,
  };

  let JSONData=await fetch("http://localhost:1234/editProfile",reqOptions);
  let JSOData=await JSONData.json();

  alert(JSOData.msg);

  console.log(JSOData); 
  };

  return (
    <div className='App'>
        <TopNavigation/>
        <form>
            <h2>Edit Profile</h2>
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
                <input type="email" ref={emailInputRef} readOnly></input>
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
                   sendUpdatedDataToServerFormData();
                }}
                >Update Profile</button>
            </div>
        </form>
    </div>
  )
}

export default EditProfile;