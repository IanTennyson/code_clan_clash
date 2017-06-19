import React from 'react'
import { Link } from 'react-router'
import LoginBox from '../auth/LoginBox'
import Header from './Header'




const Main = () => (
  <div className="main">
    <Header className='header' header={"<h1> Code Clan Clash </h1>"} />
    <LoginBox url="http://localhost:5000/" />

  </div>
)

export default Main
