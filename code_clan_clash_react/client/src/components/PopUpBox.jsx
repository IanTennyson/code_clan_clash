import React, { Component } from 'react';
import SignIn from '../auth/SignIn'
import SignUp from '../auth/SignUp' 
import {
  PopupboxManager,
  PopupboxContainer
} from 'react-popupbox';

export class PopUpBox extends Component {
componentDidMount() {
  this.openPopupbox();
}

openPopupbox() {
  if(this.props.showSignIn){
  let content = (
    <div>
      <SignIn url={this.props.url} onSignIn={this.props.onSignIn}></SignIn>
    </div>
  )

  PopupboxManager.open({
    content,
    config: {
      titleBar: {
        enable: true,
        text: 'Sign In'
      },
      fadeIn: true,
      fadeInSpeed: 500
    }
  })
}else if  (this.props.showSignUp){
    let content = (
    <div>
      <SignUp url={this.props.url} onSignUp={this.props.onSignUp}></SignUp>
    </div>
  )
  PopupboxManager.open({
    content,
    config: {
      titleBar: {
        enable: true,
        text: 'Register'
      },
      fadeIn: true,
      fadeInSpeed: 500
    }
  })}
}

render() {
  return (
    <div>
      <PopupboxContainer onClosed={this.props.onClosed} />

    </div>
  )
}
}

export default PopUpBox

