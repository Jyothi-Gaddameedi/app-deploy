import React from 'react'
import TopNavigation from './TopNavigation'
import { useSelector } from 'react-redux'

function Home() {
  let storeObj=useSelector((store)=>{
    return store
  });
console.log(storeObj);

  return (
    <div className='App'>
      <TopNavigation/>
        <h2>Home</h2>
        <h2>Hi,Welcome to {storeObj.loginDetails.firstName} {storeObj.loginDetails.lastName}</h2>
        <img src={`http://localhost:1234/${storeObj.loginDetails.profilePic}`}></img>
    </div>
  )
}

export default Home