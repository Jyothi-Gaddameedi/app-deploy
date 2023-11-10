import React, { useEffect } from 'react'
import { useSelector } from 'react-redux';
import { NavLink, useNavigate } from 'react-router-dom'

function TopNavigation() {
    let navigate=useNavigate();
    let storeObj=useSelector((store)=>{
        return store
    });

    useEffect(()=>{
        if(storeObj&&storeObj.loginDetails&&storeObj.loginDetails.firstName){
        }else{
            navigate("/");
        }
    },[]);

let deleteUserFromServer=async()=>{

   let url=`http://localhost:1234/deleteUser?email=${storeObj.loginDetails.email}`

   let reqOptions={
    method:"DELETE",
   };

let JSONData=await fetch(url,reqOptions);
let JSOData=await JSONData.json();

if(JSOData.status==="Success"){
    navigate("/");
}
alert(JSOData.msg);
}

  return (
    <div>
        <nav>
            <NavLink to="/home">Home</NavLink>
            <NavLink to="/tasks">Tasks</NavLink>
            <NavLink to="/editProfile">Edit Profile</NavLink>
            <NavLink 
            onClick={()=>{
                deleteUserFromServer();
            }}>Delete</NavLink>
            <NavLink to="/"
            onClick={()=>{
                localStorage.clear();
            }}
            >Logout</NavLink>
        </nav>
    </div>
  )
}

export default TopNavigation