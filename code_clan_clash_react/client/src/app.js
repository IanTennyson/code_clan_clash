import React from 'react'
import ReactDOM from 'react-dom'
import Main from './components/Main'
import Navigation from './components/Navigation'
// import {Router, Route, IndexRoute, hashHistory} from 'react-router'
import { HashRouter, Route } from 'react-router-dom'


class App extends React.Component{

  render(){
    return (
      <HashRouter>
        <div className='container'>
          <Route exact path="/" component={Main} />
          <Route path='/navigation' component={Navigation} />
        </div>
      </HashRouter>
    )
  }
}


ReactDOM.render(<App />, document.getElementById('app'))