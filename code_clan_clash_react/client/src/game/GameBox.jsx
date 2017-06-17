import React from 'react'
// import Score from './Score'
import Words from './Words'
import UserInput from './UserInput'
// import ProgressBar from './ProgressBar'

class GameBox extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      //GAME STATE
      wordsArray: ["ruby", "java", "javascript", "python"],
      currentWordIndex: 0,
      currentWord: null,
      gameCharArray: [],
      gameCharLetterIndex: 0,
      gameStarted: false,
      //USER STATE
      userCharArray: [],
      finishedUserWords: []
    }
    this.newUserInput = this.newUserInput.bind(this)
    this.setCurrentWord = this.setCurrentWord.bind(this)
    this.addToCharArray = this.addToCharArray.bind(this)
    this.submitFinishedWord = this.submitFinishedWord.bind(this)
    this.spaceBar = this.spaceBar.bind(this)
    this.backspace = this.backspace.bind(this)
  }

  //USER HAS TYPED A LETTER
  newUserInput(usersInput){
      this.state.gameCharLetterIndex++
      this.state.userCharArray.push(usersInput)
  }

  spaceBar(){
      this.submitFinishedWord();
      this.state.currentWordIndex++
      this.setCurrentWord();
      return;
  }

  backspace(){
    this.state.userCharArray.pop()

    if(this.state.gameCharLetterIndex === 0){
      this.state.currentWordIndex--;
      this.setCurrentWord();
      const previsoulyAttemptedWord = this.state.finishedUserWords.pop()

      this.state.userCharArray = (previsoulyAttemptedWord.split(""))
      this.state.gameCharLetterIndex = previsoulyAttemptedWord.length
      return;
    };
    this.state.gameCharLetterIndex--
  }

  setCurrentWord(){
    this.state.currentWord = this.state.wordsArray[this.state.currentWordIndex]
    this.state.gameCharArray = this.state.currentWord.split("")
  }

//CURRENTLY NOT BEING USED, IS IT FASTER?
  addToCharArray(userInput){
    this.state.userCharArray.push(usersInput)
  }

  submitFinishedWord(){
    const usersCompletedWord = this.state.userCharArray.join("")
    if(usersCompletedWord === this.state.currentWord){
    this.state.finishedUserWords.push(usersCompletedWord)
      //SET SPAN CLASS TO CORRECT
      console.log("CORRECT!")
    }else{
    this.state.finishedUserWords.push(usersCompletedWord)
      //SET SPAN CLASS TO INCORRECT
      console.log("WRONG!")
    }
    this.state.gameCharLetterIndex = 0
    this.state.userCharArray = []
  }

  render(){
    return(
      <div>
        <div className="game-box">
          <Words words={this.state.wordsArray}/>
          <UserInput 
          spaceBar={this.spaceBar} 
          triggerBackspace={this.backspace}
          letterInput={this.newUserInput} 
          prepareGame={this.setCurrentWord} />
        </div>
        <div className="progress-bar">
          
        </div>
      </div>
    )
  }

}

export default GameBox