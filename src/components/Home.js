import React, { useContext } from 'react'
import { Usercontext } from '../Context/Context'
import userEvent from '@testing-library/user-event'
export default function Home() {

  // const{status,setStatus}=useContext(Usercontext)
  const {username}=useContext(Usercontext);

  console.log("Login user",username)
  return (
    <div>Home and username {username}</div>
  )
}
