import React from 'react'
import SignIn from './SignIn'
import SignUp from './SignUp' 
import SignOut from './SignOut'
import CodeClanClash from '../components/CodeClanClash'

class LoginBox extends React.Component {

  constructor(props) {
    super(props)
    this.setUser = this.setUser.bind(this)
    this.state = {
      showSignIn: false,
      showSignUp: false,
      currentUser: null,
      username: null,
      clash: false
    }
    this.displaySignIn = this.displaySignIn.bind(this);
    this.displaySignUp = this.displaySignUp.bind(this);
    this.clashButton = this.clashButton.bind(this);
  }

  setUser(user){
    console.log("user before set:", this.state.currentUser)
    this.setState({currentUser:user})
    console.log("user after set:", this.state.currentUser)

  }

  fetchUser(){
    console.log('Checking if user has a cookie!');
    const request = new XMLHttpRequest();
    request.open("GET", this.props.url + "users.json");
    request.withCredentials = true;
    request.onload = () => {
      if(request.status === 200){
        console.log('request.responseText', request.responseText)
        console.log('Found a cookie')
        const receivedUser = JSON.parse(request.responseText);

        console.log("My Recieved User",receivedUser)
        console.log("My Recieved User.user_detail", receivedUser.user_details[0])

        receivedUser.userName = receivedUser.user_details[0].username;
        this.setState({username: receivedUser.userName})

        this.setUser(receivedUser)
      }else if (request.status === 401) {
        console.log("No cookies for you")
        this.setUser(null);
      }
    }
    request.send(null);
  }

  componentDidMount(){
    console.log("componentDidMount")
    this.fetchUser()
  }

  displaySignIn(){
    this.setState({
      showSignUp: false,
      showSignIn: true
    });
  }

  displaySignUp(){
    this.setState({
      showSignIn: false,
      showSignUp: true
    });
  }

  clashButton(){
    this.setState({clash: true});
  }

  render () {
//No user signed in
var mainDiv = <div className="log-in">
  <button onClick={this.displaySignIn}>Sign In</button>
  <button onClick={this.displaySignUp}>Sign Up</button>
    {this.state.showSignIn ?
      <SignIn url={this.props.url + "users/sign_in.json"} onSignIn={this.setUser}></SignIn> : null }

    {this.state.showSignUp ? <SignUp url={this.props.url + "users.json"} onSignUp={this.setUser}></SignUp> : null }
      </div>
//User is signed in on NAV page
  if(this.state.currentUser){
    mainDiv = <div className="nav-page">
    <h4> Welcome {this.state.currentUser.userName}</h4>
    <button className="clash-button" onClick={this.clashButton}>Clash</button>
    <SignOut url={this.props.url + "users/sign_out.json"} onSignOut={this.setUser}></SignOut>
  </div>
      }
  //user clicked Clash button
  if(this.state.clash){
    mainDiv = <div className="clash-page">
    <CodeClanClash />
  </div>
      }


  return (
    <div>
      { mainDiv }
    </div>
    ) 
  }
}

export default LoginBox