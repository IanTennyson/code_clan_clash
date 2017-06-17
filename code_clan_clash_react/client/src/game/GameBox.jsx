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
      correctUserWords: [],
      incorrectUserWords: [],
    }
    this.newUserInput = this.newUserInput.bind(this)
    this.setCurrentWord = this.setCurrentWord.bind(this)
    this.addToCharArray = this.addToCharArray.bind(this)
    this.submitFinishedWord = this.submitFinishedWord.bind(this)
    this.spaceBar = this.spaceBar.bind(this)
    this.backspace = this.backspace.bind(this)
  }

  newUserInput(usersInput){
    const gameLetters = this.state.gameCharArray;
    const letterIndex = this.state.gameCharLetterIndex;
    //USER HAS CORRECTLY TYPED THE DESIRED LETTER
    if(usersInput === gameLetters[letterIndex]){
      console.log(usersInput, " === ", gameLetters[letterIndex])
      this.state.gameCharLetterIndex++
      this.state.userCharArray.push(usersInput)
      return;
    }else if //USER HAS TYPED THE WRONG CHARACTER
    (usersInput !== gameLetters[letterIndex]){
      this.state.gameCharLetterIndex++
      this.state.userCharArray.push(usersInput)
      return;
    }
  }

  spaceBar(){
    //USER HAS TYPED A SPACE
      this.submitFinishedWord();
      this.state.currentWordIndex++
      this.setCurrentWord();
      return;
  }

  //USER TYPES "A"
  //"A" GETS PUSHED INTO userCharArray REGARDLESS OF IT BEING RIGHT OR WRONG
  //


  backspace(){
    this.state.userCharArray.pop()
    if(this.state.gameCharLetterIndex === 0){
      this.state.currentWordIndex--;
      this.setCurrentWord();
      console.log(this.state.currentWord)
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
    this.state.correctUserWords.push(usersCompletedWord)
      //SET SPAN CLASS TO CORRECT
      console.log("CORRECT!")
    }else{
    this.state.incorrectUserWords.push(usersCompletedWord)
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