import React from 'react'
// import Score from './Score'
import Words from './Words'
import UserInput from './UserInput'
// import ProgressBar from './ProgressBar'

class GameBox extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      wordsArray: ["Ruby", "Java", "JavaScript", "Python"],
      charArray: [],
      currentWord: "Ruby",
      currentWordIndex: 0,
      charLetterIndex: 0,
      oldUserWords: [],
      // usersCurrentWordAttempt: "", think this is redundant because of charArray.join("") 
      gameStarted: false
    }
    this.newUserInput = this.newUserInput.bind(this)
    this.setCurrentWord = this.setCurrentWord.bind(this)
    this.addToCharArray = this.addToCharArray.bind(this)
    this.finishCharArray = this.finishCharArray.bind(this)

  }

//Will need to find a way to call this before the game starts
//For now I will hard code the currentWord to Ruby
  prepareGame(){
    this.setState({currentWord: this.state.wordsArray[this.state.currentWordIndex]})
  }

  newUserInput(usersInput){
    console.log("usersInput", usersInput)
    if(usersInput === " "){
      this.state.currentWordIndex++
      this.setCurrentWord();
      this.finishCharArray(usersInput);
    }
  }

  setCurrentWord(){
    this.setState({currentWord: this.state.wordsArray[this.state.currentWordIndex]})
    // console.log("CURRENT WORD", this.state.currentWord)
  }

  addToCharArray(userInput){
    this.state.charArray.push(usersInput)
    console.log("NEW CHAR ARRAY",this.state.charArray)
  }

  finishCharArray(){

    this.state.charArray = []
  }

  render(){
    return(
      <div>
        <div className="game-box">
          <Words words={this.state.wordsArray}/>
          <UserInput callback={this.newUserInput}/>
        </div>
        <div className="progress-bar">
          
        </div>
      </div>
    )
  }

}

export default GameBox