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
  }

//Will need to find a way to call this before the game starts
//For now I will hard code the currentWord to Ruby

  newUserInput(usersInput){
    console.log("usersInput", usersInput)
    //USER HAS TYPED A SPACE

    //USER HAS CORRECTLY TYPED THE DESIRED LETTER
    if(usersInput === this.state.gameCharArray[this.state.gameCharLetterIndex]){
      console.log(usersInput, " === ", this.state.gameCharArray[this.state.gameCharLetterIndex])
      this.state.gameCharLetterIndex++
      this.state.userCharArray.push(usersInput)
      return;
    }else if //USER HAS TYPED THE WRONG CHARACTER
    (usersInput !== this.state.gameCharArray[this.state.gameCharLetterIndex]){
      this.state.gameCharLetterIndex++
      this.state.userCharArray.push(usersInput)
      return;
    }
  }

  spaceBar(){
      this.submitFinishedWord();
      this.state.currentWordIndex++
      this.setCurrentWord();
      return;
  }

  setCurrentWord(){
    this.state.currentWord = this.state.wordsArray[this.state.currentWordIndex]
    this.state.gameCharArray = this.state.currentWord.split("")
  }

  addToCharArray(userInput){
    this.state.userCharArray.push(usersInput)
    console.log("NEW CHAR ARRAY",this.state.userCharArray)
  }

  submitFinishedWord(){
    const usersCompletedWord = this.state.userCharArray.join("")
    console.log("User Current Word", usersCompletedWord)
    console.log("Game Current Word",this.state.currentWord)
    if(usersCompletedWord === this.state.currentWord){
    this.state.correctUserWords.push(usersCompletedWord)
      //NEED TO FIGURE OUT HOW TO SET THE CLASS OF THE SPAN!
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