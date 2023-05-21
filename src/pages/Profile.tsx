import React from 'react'
import useAppSelector from "../hooks/useAppSelector"

const Profile = () => {
  const userState = useAppSelector(state => state.usersReducer)
  const {currentUser} = userState
  
  return (
    <div>
      <h1>Profile</h1>
      <p>Name: {currentUser?.name}</p>
      <img src={currentUser?.avatar} />
    </div>
  )
}

export default Profile
