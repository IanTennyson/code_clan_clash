import React from 'react'
import ReactDOM from 'react-dom'
import LoginBox from './auth/LoginBox'
// import {Router, Route, IndexRoute, hashHistory} from 'react-router'
import { HashRouter, Route } from 'react-router-dom'


class App extends React.Component{

  render(){
    return (
      <HashRouter>
        <div className='container'>
          <Route exact path="/" component={LoginBox} />
        </div>
      </HashRouter>
    )
  }
}


ReactDOM.render(<App />, document.getElementById('app'))