import React from 'react'
import Score from './Score'
import Words from './Words'
import ReloadPage from './ReloadPage'
import UserInput from './UserInput'
import ProgressBar from './ProgressBar'
// length
class GameBox extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      wordsArray: ["now", "now", "now", "now", "now"],
      currentWordIndex: 0,
      currentWord: null,
      gameCharLetterIndex: 0,
      gameStarted: false,
      numberOfUserInputs: 0,
      indexsOfUncorrectedWords: [],
      grossWPM: 0,
      netWPM: 0,
      startTime: 0.00
    }
    this.submitFinishedWord = this.submitFinishedWord.bind(this)
    this.setCurrentWord = this.setCurrentWord.bind(this)
    this.calculateWPM = this.calculateWPM.bind(this)
    this.backspace = this.backspace.bind(this)
    this.startGame = this.startGame.bind(this)
    this.spaceBar = this.spaceBar.bind(this)
    this.stopGame = this.stopGame.bind(this)
    this.beginGame = this.beginGame.bind(this)
  }

  beginGame(){
    this.setState({gameStarted: true}) 
    this.startGame();
  }

  startGame(){
    var counter = 0;

    console.log("The game has started")

    const timer = setInterval(() => {
      this.calculateWPM()
      counter++
      if(counter === 12){
        clearInterval(timer)
        this.stopGame()
      }
    }, 5000)
  }

  stopGame(){
    console.log("GAME OVER!")
    this.setState({gameStarted: false})
    //Need to reset the progress bar
    //need to reset the "time" currently if the game is restarted it will continue from 60 seconds
  }


  calculateWPM(){

    const allUserInput = this.state.numberOfUserInputs
    let uncorrectedErrors = this.state.indexsOfUncorrectedWords.length
    const addTime = 0.05
    const time = (this.state.startTime += addTime).toFixed(2)
    console.log("Time Passed: ", time)

    const grossWPM = (allUserInput / 5)
    const predictedGrossWPM = grossWPM / time

    let netWPM = (grossWPM - uncorrectedErrors) / time
    const roundedGrossWPM = parseInt(predictedGrossWPM)
    const roundedNetWPM = parseInt(netWPM)



    //Why is this re-running my gameStarted state?!
    //Do I need to use ShoudComponentUpdate?
    this.setState({ grossWPM: roundedGrossWPM, netWPM: roundedNetWPM })
  }

  spaceBar(userSubmittedWord){
      console.log("userSubmittedWord Length",userSubmittedWord.length)
      this.state.numberOfUserInputs += userSubmittedWord.length
      this.submitFinishedWord(userSubmittedWord);
      this.state.currentWordIndex++
      this.setCurrentWord();
      return;
  }
// 1. If user succesfully completes a word, presses space and presses backpace, space it comes back as a correct. Need to test if this will mess with the WPM score.
  backspace(allUserText){
    console.log("allUserText",allUserText)

    if(allUserText.slice(-1) === " "){
      this.state.currentWordIndex--;
      this.setCurrentWord();
      console.log("CURRENT WORD: ", this.state.currentWord)
      this.state.gameCharLetterIndex = this.state.currentWord.length
      console.log("gameCharLetterIndex", this.state.gameCharLetterIndex)
      
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
          <Score grossWPM={this.state.grossWPM} netWPM={this.state.netWPM}/>
          <Words words={this.state.wordsArray}/>
          <UserInput 
          spaceBar={this.spaceBar} 
          triggerBackspace={this.backspace}
          letterInput={this.newUserInput} 
          prepareGame={this.setCurrentWord}
          startTest={this.beginGame} 
          hasGameStarted={this.state.gameStarted}
          />
        </div>

        <ProgressBar hasGameStarted={this.state.gameStarted} />

        <ReloadPage />
      </div>
    )
  }

}

export default GameBox