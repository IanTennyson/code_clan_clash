import React from 'react'

import io from 'socket.io-client';


import SignOut from './SignOut'
import CodeClanClash from '../components/CodeClanClash'
import PopUpBox from '../components/PopUpBox'
import Header from '../components/Header'

class LoginBox extends React.Component {

  constructor(props) {
    super(props)
    this.setUser = this.setUser.bind(this)
    this.state = {
      showSignIn: false,
      showSignUp: false,
      currentUser: null,
      username: null,
      clash: false,
      url: "http://localhost:5000/",
      users: []
    }
    this.displaySignIn = this.displaySignIn.bind(this);
    this.displaySignUp = this.displaySignUp.bind(this);
    this.clashButton = this.clashButton.bind(this);

    this.socket = io("http://localhost:3000");
    this.socket.on('joined', (users) => {
        console.log("joined");
        console.log("users", users)
        if(users.user === null)return; //WHA!?
        this.setState({users: users});
    });
  }

  setUser(user){
    // console.log("user before set:", this.state.currentUser)
    this.setState({currentUser:user}, () => {
      if(this.state.user !== null) {
        this.socket.emit("joined", this.state.username);
      }
    });
    // console.log("user after set:", this.state.currentUser)

  }

  fetchUser(){
    // console.log('Checking if user has a cookie!');
    const request = new XMLHttpRequest();
    request.open("GET", this.state.url + "users.json");
    request.withCredentials = true;
    request.onload = () => {
      if(request.status === 200){
        // console.log('request.responseText', request.responseText)
        // console.log('Found a cookie')
        const receivedUser = JSON.parse(request.responseText);

        // console.log("My Recieved User",receivedUser)
        // console.log("My Recieved User.user_detail", receivedUser.user_details[0])

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
    // console.log("componentDidMount")
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

var mainDiv =   
<div className="all" >
  <Header className='header' startTag="Where " keyword="friends" endTag=" colleagues come to Clash" header={"<h1> Code Clan Clash </h1>"} />
  <div className="log-in" id="app">
    <div className="buttons">
      <button onClick={this.displaySignIn} className="sign-in-button">Sign In</button>
      <button onClick={this.displaySignUp} className="sign-up-button">Register</button>
    </div>
    {this.state.showSignIn ?
      <PopUpBox 
      showSignIn={this.state.showSignIn} 
      url={this.state.url + "users/sign_in.json"} 
      onClosed={()=> { this.setState({ showSignIn: false, showSignUp: false})} } 
      onSignIn={this.setUser}/> : null }

      
    {this.state.showSignUp ? 
      <PopUpBox 
      showSignUp={this.state.showSignUp} 
      url={this.state.url + "users.json"} 
      // onClosed={()=> { this.setState({ showSignIn: false, showSignUp: false})} } 
      onSignUp={this.setUser}/> : null }
  
    </div>
  </div>


//User is signed in on NAV page
  if(this.state.currentUser){
    
    mainDiv = 
    <div className="all" >
      <div className="nav-page">
        <Header className='header' header={"<h1> Code Clan Clash </h1>"} startTag="Where " keyword="friends" endTag=" colleagues come to Clash" />
          <div className="buttons-two">
            <button className="clash-button" onClick={this.clashButton}>Clash</button>
            <SignOut url={this.state.url + "users/sign_out.json"} onSignOut={this.setUser}></SignOut>
          </div>
      </div>
    </div>
      }
  //user clicked Clash button
  if(this.state.clash){
    mainDiv = <div className="clash-page">
    <CodeClanClash user={this.state.currentUser} socket={this.socket} users={this.state.users} />
  </div>
      }


  return (
    <div className="test">
      <div className="second-test">
        { mainDiv }
      </div>
    </div>
    ) 
  }
}

export default LoginBox