import React from 'react'
import Score from './Score'
import Words from './Words'
import UserInput from './UserInput'
// import ProgressBar from './ProgressBar'

class GameBox extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      //GAME STATE
      //The words the user must type
      wordsArray: ["one", "two", "three", "how", "now", "how", "now", "how", "now", "how"],
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
      // userCharArray: [],
      //The words the user has previsouly entered
      // finishedUserWords: [],
      //Num of words the users has correctly and incorrectly typed
      gameStarted: false,
      numberOfUserInputs: 0,
      indexsOfUncorrectedWords: []
    }
    // this.newUserInput = this.newUserInput.bind(this)
    this.setCurrentWord = this.setCurrentWord.bind(this)
    this.submitFinishedWord = this.submitFinishedWord.bind(this)
    this.spaceBar = this.spaceBar.bind(this)
    this.backspace = this.backspace.bind(this)
    this.startGame = this.startGame.bind(this)
    this.calculateWPM = this.calculateWPM.bind(this)
  }

  startGame(){
    this.setState({ gameStarted: true })
    console.log("The game has started")
    setInterval(this.calculateWPM, 5000)
  }

  calculateWPM(){
    const allUserInput = this.state.numberOfUserInputs
    const uncorrectedErrors = this.state.indexsOfUncorrectedWords.length //need all the uncorrected words user has typed 
    const grossWPM = allUserInput / 5
    console.log("grossWPM", grossWPM)
    const netWPM = grossWPM - uncorrectedErrors / 1
    console.log("netWPM", netWPM)






    // Gross WPM calc = 
    // all letters (including spaces) typed 
    //     divided by 5 
    // divided by 1 (1 meaning 1 min)

    //Net WPM calc = 
    // all letters (including spaces) typed 
    //     divided by 5 

    //    -UNCORRECTED Errors
    // divided by 1 (1 meaning 1 min)
  }

  spaceBar(userSubmittedWord){
      this.state.numberOfUserInputs += userSubmittedWord.length
      console.log("Space Bar", userSubmittedWord)
      this.submitFinishedWord(userSubmittedWord);
      this.state.currentWordIndex++
      this.setCurrentWord();
      return;
  }

// 1. Gives an error if you backspace after array is finished but this wont be a problem when finished

// 2. If user succesfully completes a word, presses space and presses backpace, space it comes back as a correct. Be careful to correct this when calculating WPM etc.
  backspace(allUserText){
    console.log("allUserText",allUserText)

    if(allUserText.slice(-1) === " "){
      this.state.currentWordIndex--;
      this.setCurrentWord();
      this.state.gameCharLetterIndex = this.state.currentWord.length
      
      // console.log("currentWordIndex",this.state.currentWordIndex)
      // console.log("ALL INCORRECT WORDS INDEXS",this.state.indexsOfUncorrectedWords)
      // console.log("MOST RECENT INCORRECT WORD INDEX",this.state.indexsOfUncorrectedWords.slice(-1))
// console.log(this.state.indexsOfUncorrectedWords.slice(-1), "===" ,this.state.currentWordIndex )


      if(this.state.indexsOfUncorrectedWords.slice(-1).pop() === this.state.currentWordIndex){
        console.log("index of wrong word is equal to currentWordIndex")
        this.state.indexsOfUncorrectedWords.splice(-1, 1)
      }
      return;
    };
    this.state.gameCharLetterIndex--
  }

  setCurrentWord(){
    this.state.currentWord = this.state.wordsArray[this.state.currentWordIndex]
  }

  submitFinishedWord(userSubmittedWord){
      console.log("CURRENT WORD INDEX", this.state.currentWordIndex)

    console.log(userSubmittedWord, "===", this.state.currentWord)
    if(userSubmittedWord === this.state.currentWord){
      //SET SPAN CLASS TO CORRECT
      console.log("CORRECT!")

      // this.setState(this.state.correct)

    }else{
      //SET SPAN CLASS TO INCORRECT
      console.log("INCORRECT!")
      this.state.indexsOfUncorrectedWords.push(this.state.currentWordIndex)
      console.log("indexsOfUncorrectedWords", this.state.indexsOfUncorrectedWords)
    }
    // this.state.finishedUserWords.push(userSubmittedWord)
    this.state.gameCharLetterIndex = 0
  }

  render(){
    return(
      <div>
        <div className="game-box">
          <Score correct={this.state.correct} incorrect={this.state.incorrect}/>
          <Words words={this.state.wordsArray}/>
          <UserInput 
          spaceBar={this.spaceBar} 
          triggerBackspace={this.backspace}
          letterInput={this.newUserInput} 
          prepareGame={this.setCurrentWord}
          startTest={this.startGame} 
          hasGameStarted={this.state.gameStarted}
          />
        </div>
        <div className="progress-bar">
          
        </div>
      </div>
    )
  }

}

export default GameBox