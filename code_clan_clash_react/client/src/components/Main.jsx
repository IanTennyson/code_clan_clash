import React from 'react'
import { Link } from 'react-router'
import LoginBox from '../auth/LoginBox'

const Main = () => (
  <div className="main">
    <h1 className='title'>CodeClanClash</h1>
    <LoginBox url="http://localhost:5000/" />
  </div>
)

export default Main
