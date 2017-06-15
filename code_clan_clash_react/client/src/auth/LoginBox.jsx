import React from 'react'
import SignIn from './SignIn'
import SignUp from './SignUp' 
import SignOut from './SignOut'

class LoginBox extends React.Component {

  constructor(props) {
    super(props)
    this.setUser = this.setUser.bind(this)
    this.state = {
      showSignIn: false,
      showSignUp: false,
      currentUser: null
    }
    this.displaySignIn = this.displaySignIn.bind(this);
    this.displaySignUp = this.displaySignUp.bind(this);
  }

  setUser(user){
    console.log("user :", user)
    this.setState({currentUser:user})
  }

  fetchUser(){
    console.log('Checking if user has a cookie!');
    const request = new XMLHttpRequest();
    request.open("GET", this.props.url + "users.json");
    request.withCredentials = true;
    request.onload = () => {
      if(request.status === 200){
        console.log('request.responseText', request.responseText)
        console.log('Om Nom Nom')
        const receivedUser = JSON.parse(request.responseText);

        receivedUser.userName = receivedUser.user_details[0].username;

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

  render () {
      var mainDiv = <div>
        <button onClick={this.displaySignIn}>Sign In</button>
        <button onClick={this.displaySignUp}>Sign Up</button>

        {this.state.showSignIn ?
                  <SignIn url={this.props.url + "users/sign_in.json"} onSignIn={this.setUser}></SignIn>  :
                   null
                }

        {this.state.showSignUp ? <SignUp url={this.props.url + "users.json"} onSignUp={this.setUser}></SignUp> : null }

      </div>

      if(this.state.currentUser){
        mainDiv = <div>
          <h4> Welcome {this.state.currentUser.userName}</h4>
          <SignOut url={this.props.url + "users/sign_out.json"} onSignOut={this.setUser}></SignOut>
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