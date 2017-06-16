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
      currentWord: "ruby",
      gameCharArray: ["r", "u", "b", "y"],
      gameCharLetterIndex: 0,
      gameStarted: false,
      //USER STATE
      userCharArray: [],
      oldUserWords: [],
    }
    this.newUserInput = this.newUserInput.bind(this)
    this.setCurrentWord = this.setCurrentWord.bind(this)
    this.addToCharArray = this.addToCharArray.bind(this)
    this.submitFinishedWord = this.submitFinishedWord.bind(this)

  }

//Will need to find a way to call this before the game starts
//For now I will hard code the currentWord to Ruby
  prepareGame(){
    this.setState({currentWord: this.state.wordsArray[this.state.currentWordIndex]})
  }

  newUserInput(usersInput){
    console.log("usersInput", usersInput)
    //USER HAS TYPED A SPACE
    if(usersInput === " "){
      this.submitFinishedWord(usersInput);
      this.state.currentWordIndex++
      this.setCurrentWord();
    }
    //USER HAS CORRECTLY TYPED THE DESIRED LETTER
    if(usersInput === this.state.gameCharArray[this.state.gameCharLetterIndex]){
      console.log(usersInput, " === ", this.state.gameCharArray[this.state.gameCharLetterIndex])
      this.state.gameCharLetterIndex++
      this.state.userCharArray.push(usersInput)
    }else if (usersInput !== this.state.gameCharArray[this.state.gameCharLetterIndex]){
      this.state.gameCharLetterIndex++
      this.state.userCharArray.push(usersInput)
    }
    console.log("gameCharLetterIndex", this.state.gameCharLetterIndex)
    //USER HAS TYPED THE WRONG CHARACTER


  }

  setCurrentWord(){
    this.state.currentWord = this.state.wordsArray[this.state.currentWordIndex]
    // console.log("CURRENT WORD", this.state.currentWord)
    this.state.gameCharArray = this.state.currentWord.split("")
    console.log("gameCharArray", this.state.gameCharArray)
  }

  addToCharArray(userInput){
    this.state.userCharArray.push(usersInput)
    console.log("NEW CHAR ARRAY",this.state.userCharArray)
  }

  submitFinishedWord(){
    const usersCompletedWord = this.state.userCharArray.join("")
    console.log("usersCompletedWord", usersCompletedWord)
    console.log("Game Current Word",this.state.currentWord)
    if(usersCompletedWord === this.state.currentWord){
      //NEED TO FIGURE OUT HOW TO SET THE CLASS OF THE SPAN!
      //SET SPAN CLASS TO CORRECT
      console.log("CORRECT!")
    }else{
      //SET SPAN CLASS TO INCORRECT
      console.log("WRONG!")
    }
    this.state.gameCharLetterIndex = 0
    this.state.oldUserWords.push(usersCompletedWord)
    this.state.userCharArray = []
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