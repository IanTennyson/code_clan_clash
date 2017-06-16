import React from 'react'
// import Score from './Score'
import Words from './Words'
import UserInput from './UserInput'
// import ProgressBar from './ProgressBar'

class GameBox extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      allWords: ["Ruby", "Java", "JavaScript", "Python"],
      charArray: [],
      currentWord: null,
      currentWordIndex: 0,
      charLetterIndex: 0,
      oldUserWords: [],
      usersCurrentWordAttempt: "",
      gameStarted: false
    }
    this.newUserInput = this.newUserInput.bind(this)
  }

  newUserInput(){
    console.log("GAME BOX NEW USER INPUT")
  }

  render(){
    return(
      <div>
        <div className="game-box">
          <Words words={this.state.allWords}/>
          <UserInput callback={this.newUserInput}/>
        </div>
        <div className="progress-bar">
          
        </div>
      </div>
    )
  }

}

export default GameBox