import React from 'react'
import EightBitMan from "./EightBitMan"

class SignIn extends React.Component {

  constructor(props){
    super(props)
    this.handleOnChangeEmail = this.handleOnChangeEmail.bind(this)
    this.handleOnChangePassword = this.handleOnChangePassword.bind(this)
    this.signIn = this.signIn.bind(this)
    this.state = {
      email:"", 
      password:"",
      eightBitManError: null
    }
  }

  handleOnChangeEmail(event) {
    this.setState({email: event.target.value})
  }

  handleOnChangePassword(event) {
    this.setState({password: event.target.value})
  }

  signIn(event){
    event.preventDefault();
    const request = new XMLHttpRequest();
    //creating a cookie!
    request.open("POST", this.props.url);
    request.setRequestHeader("Content-Type", "application/json");
    request.withCredentials = true;

    request.onload = () => {
      if(request.status === 201){
        const user = JSON.parse(request.responseText);
        this.props.onSignIn(user);
      }

      if(request.status === 401){
        console.log("response",request.responseText)
        console.log("response AHHHH",request.response)
        this.setState({eightBitManError: request.response})
      }

 

    }
    const data = {
      user: {
        email: this.state.email,
        password: this.state.password
      }
    }
    request.send(JSON.stringify(data));
  }
  
  render() {
    return (
      <form  className='login-form' >
        <input type="text" onChange={this.handleOnChangeEmail}  placeholder="Email" />
        <input type="password" onChange={this.handleOnChangePassword}  placeholder="Password" id="password-input"/>
    
        <button onClick={this.signIn}>  Sign In </button>
        {this.state.eightBitManError ? <EightBitMan singleError={this.state.eightBitManError} /> : null }

      </form>
      
    )
  }
}

export default SignIn