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
      //The words the user must type
      wordsArray: ["ruby", "java", "ruby", "java", "ruby", "java", "ruby", "java", "ruby", "java", "ruby", "java",],
      //The index of the word in the wordsArray
      currentWordIndex: 0,
      //The current word the user must type
      currentWord: null,
      //The current word split into an array of letters
//The game is running to slow so cutting this out for now
      // gameCharArray: [],
      //The index of the letters in the currentWord
      gameCharLetterIndex: 0,
      //The letters the user has submitted to form the currentWord
      userCharArray: [],
      //The words the user has previsouly entered
      finishedUserWords: [],
      //Num of words the users has correctly and incorrectly typed
      correct: 0,
      incorrect: 0
    }
    // this.newUserInput = this.newUserInput.bind(this)
    this.setCurrentWord = this.setCurrentWord.bind(this)
    this.submitFinishedWord = this.submitFinishedWord.bind(this)
    this.spaceBar = this.spaceBar.bind(this)
    this.backspace = this.backspace.bind(this)
    console.log("STATE", this.state)
  }

  spaceBar(userSubmittedWord){
      this.submitFinishedWord(userSubmittedWord);
      this.state.currentWordIndex++
      this.setCurrentWord();
      return;
  }

//Only problem with backspace is it can't be held. If held it will register 1 click but will delete multiple letters from the user input putting the user out of sync with the game.
  backspace(){
    console.log("Before",this.state.userCharArray)
    this.state.userCharArray.pop()
    console.log("after",this.state.userCharArray)

    if(this.state.gameCharLetterIndex === 0){
      this.state.currentWordIndex--;
      this.setCurrentWord();
      const previsoulyAttemptedWord = this.state.finishedUserWords.pop()
      this.state.userCharArray = previsoulyAttemptedWord.split("")
      this.state.gameCharLetterIndex = this.state.currentWord.length
      return;
    };
    this.state.gameCharLetterIndex--
  }

  setCurrentWord(){
    this.state.currentWord = this.state.wordsArray[this.state.currentWordIndex]
  }

  submitFinishedWord(userSubmittedWord){
    console.log(userSubmittedWord, "===", this.state.currentWord)
    if(userSubmittedWord === this.state.currentWord){
      //SET SPAN CLASS TO CORRECT
      console.log("CORRECT!")
    }else{
      //SET SPAN CLASS TO INCORRECT
      console.log("INCORRECT!")
    }
    this.state.finishedUserWords.push(userSubmittedWord)
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