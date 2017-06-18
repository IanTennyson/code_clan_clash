import React from 'react'
import { Link } from 'react-router'
import LoginBox from '../auth/LoginBox'
import Header from './Header'




const Main = () => (
  <div className="main">
    <Header className='header' header={"Code Clan Clash"} />
    <LoginBox url="http://localhost:5000/" />

  </div>
)

export default Main
