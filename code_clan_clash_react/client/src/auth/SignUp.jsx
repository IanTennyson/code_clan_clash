import React from 'react'
import EightBitMan from './EightBitMan'

class SignUp extends React.Component {

  constructor(props) {
    super(props)
    this.signUp = this.signUp.bind(this)
    this.handleOnChangeEmail = this.handleOnChangeEmail.bind(this)
    this.handleOnChangePassword = this.handleOnChangePassword.bind(this)
    this.handleOnChangePassConf = this.handleOnChangePassConf.bind(this)
    this.handleUsername = this.handleUsername.bind(this)
    this.state = {
      email:"", 
      password:"", 
      passwordConfirmation:"",
      userName:"",
      eightBitManError: null
    }
  }

  signUp(event){

    // sign up request here
    event.preventDefault();
    const request = new XMLHttpRequest();
    request.open("POST", this.props.url);
    request.setRequestHeader("Content-Type", "application/json");
    request.withCredentials = true;
    request.onload = () => {
      if (request.status === 201){

        const user = JSON.parse(request.responseText)

        //  user: this.state.userName
        const request2 = new XMLHttpRequest();
        request2.open("POST",  "http://localhost:5000/api/accounts");
        request2.setRequestHeader("Content-Type", "application/json");
        request2.withCredentials = true;
        request2.onload = () => {
            user.userName = this.state.userName;
            this.props.onSignUp(user)
            console.log("user after 2nd post request", user);
        }

        const data2 = {
          user_id: user.id,
          userName: this.state.userName
        }

        request2.send(JSON.stringify(data2));
      }
      if (request.status === 422){
        console.log("You have hit a 422", request.response)
        
        this.setState({eightBitManError: request.response})
      }
    }
    const data = {
      user: {
        email: this.state.email,
        password: this.state.password,
        password_confirmation: this.state.passwordConfirmation
      }
    }
    request.send(JSON.stringify(data));
  }

  handleOnChangeEmail(event) {
    this.setState({email: event.target.value})
  }

  handleOnChangePassword(event) {
    this.setState({password: event.target.value})
  }

  handleOnChangePassConf(event) {
    this.setState({passwordConfirmation: event.target.value})
  }

  handleUsername(event){
    this.setState({userName: event.target.value})
  }

  handleVictory(event){
    
  }

  handleDefeat(event){
    
  }
  
  render() {
    return (
      <form onSubmit={this.signUp} className='login-form'>
        <input type="text" onChange={this.handleOnChangeEmail}  placeholder="Email" />
        <br/>
        <br/>
        <input type="password" onChange={this.handleOnChangePassword}  placeholder="Password" />
        <br/>
        <br/>
        <input type="password" onChange={this.handleOnChangePassConf}  placeholder="Password Confirmation" />
        <br/>
        <br/>
        <input type="username" onChange={this.handleUsername}  placeholder="Enter your Username" />
        <br/>
        <br/>
        <button className="pop-box-sign-up-button" onClick={this.signUp}>  Register </button>

        {this.state.eightBitManError ? <EightBitMan error={this.state.eightBitManError} /> : null }

      </form>
    )
  }
}

export default SignUp