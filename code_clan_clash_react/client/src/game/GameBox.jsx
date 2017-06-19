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
      // wordsArray: ["now", "now", "now", "now", "now"],
      wordsArrayObj: [
      {value: "first", status: "nextword"},
      {value: "new", status: "nextword"},
      {value: "new", status: "nextword"},
      {value: "new", status: "nextword"},
      {value: "new", status: "nextword"},
      ],

      // [{value: "new", status: "currentword"},]


      currentWordIndex: 0,
      currentWord: null,
      gameStarted: false,
      numberOfUserInputs: 0,
      indexsOfUncorrectedWords: [],
      grossWPM: 0,
      netWPM: 0,
      startTime: 0.00,
      gameOver: false,
      
    }
    this.submitFinishedWord = this.submitFinishedWord.bind(this);
    this.setCurrentWord = this.setCurrentWord.bind(this);
    this.calculateWPM = this.calculateWPM.bind(this);
    this.backspace = this.backspace.bind(this);
    this.startGame = this.startGame.bind(this);
    this.beginGame = this.beginGame.bind(this);
    this.spaceBar = this.spaceBar.bind(this);
    this.stopGame = this.stopGame.bind(this);
    this.updateClassName = this.updateClassName.bind(this);
    this.componentWillUpdate = this.componentWillUpdate.bind(this)
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
      if(counter === 120){
        clearInterval(timer)
        this.stopGame()
      }
    }, 500)
  }

  stopGame(){
    console.log("GAME OVER!")
    this.setState({gameStarted: false, gameOver: true})
    //Need to reset the progress bar
    //need to reset the "time" currently if the game is restarted it will continue from 60 seconds
  }


  calculateWPM(){

    const allUserInput = this.state.numberOfUserInputs
    let uncorrectedErrors = this.state.indexsOfUncorrectedWords.length
    const addTime = 0.01
    const time = (this.state.startTime += addTime).toFixed(2)

    const grossWPM = (allUserInput / 5)
    const predictedGrossWPM = grossWPM / time

    let netWPM = (grossWPM - uncorrectedErrors) / 1
    const roundedGrossWPM = parseInt(predictedGrossWPM)
    const roundedNetWPM = parseInt(netWPM)

    this.setState({ grossWPM: roundedGrossWPM, netWPM: roundedNetWPM })
  }

  spaceBar(userSubmittedWord){
      this.state.numberOfUserInputs += userSubmittedWord.length
      this.submitFinishedWord(userSubmittedWord);
      this.state.currentWordIndex++
      this.setCurrentWord();
      return;
  }

  backspace(allUserText){
    console.log("allUserText",allUserText)

    if(allUserText.slice(-1) === " "){
      this.updateClassName('nextword')
      this.state.currentWordIndex--;
      this.setCurrentWord();

      if(this.state.indexsOfUncorrectedWords.slice(-1).pop() === this.state.currentWordIndex){
        console.log("index of wrong word is equal to currentWordIndex")
        this.state.indexsOfUncorrectedWords.splice(-1, 1)
      }
      return;
    };

  }

  setCurrentWord(){
    this.state.currentWord = Object.values(this.state.wordsArrayObj[this.state.currentWordIndex])[0]
    this.updateClassName('currentword')
  }

  updateClassName(newClassName){
    this.state.wordsArrayObj[this.state.currentWordIndex]['status'] = newClassName
  }

  componentWillUpdate(){
  }

  submitFinishedWord(userSubmittedWord){
    if(userSubmittedWord.pop() === this.state.currentWord ){
      this.updateClassName('correct')
      console.log("CORRECT!")
    }else{
      this.updateClassName('incorrect')
      console.log("INCORRECT!")
      this.state.indexsOfUncorrectedWords.push(this.state.currentWordIndex)
      console.log("indexsOfUncorrectedWords", this.state.indexsOfUncorrectedWords)
    }
  }

  render(){
    const pageDiv = 
      <div className="master-game-div">
        <Score grossWPM={this.state.grossWPM} netWPM={this.state.netWPM}/>
        <Words 
        words={this.state.wordsArrayObj} 
        
        currentWordIndex={this.state.currentWordIndex}
        indexsOfUncorrectedWords={this.state.indexsOfUncorrectedWords}/>
        <UserInput 
        spaceBar={this.spaceBar} 
        triggerBackspace={this.backspace}
        letterInput={this.newUserInput} 
        prepareGame={this.setCurrentWord}
        startTest={this.beginGame} 
        hasGameStarted={this.state.gameStarted}
        />
        <ProgressBar hasGameStarted={this.state.gameStarted} />
        <ReloadPage />
      </div>


    return(
      <div>
        {pageDiv}
      </div>
    )
  }

}

export default GameBox