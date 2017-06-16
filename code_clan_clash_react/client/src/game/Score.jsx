STATE
wordsArray: ["One", "Two", "Three"],
//the current word split eg. ["o","n","e"]
charArray: [],
//From the wordsArray this will be the current word to type
currentWord: null,
//The index of the current word in the array
currentWordIndex: 0,
//The index of the current letter in the char array
charLetterIndex: 0,

//oldUserWords hold the words the user has previsouly typed both correct and incorrect ["one", "twwo"]
oldUserWords: [],
//usersCurrentWordAttempt holds the users attempt to reproduce the currentWord
usersCurrentWordAttempt: "",

// gameStarted will need to tell the clock to start
gameStarted: false




newUserInput(userInput){
  setState({gameStarted: true})
//user has pressed space without entering anything
  if(userInput === "") return;

//user has pressed space declaring they have finished with a word
  if(userInput === " "){
    currentWordIndex++
    this.setCurrentWord()
    this.updateCharArray()
    this.setState({ charLetterIndex: 0 })

    return;
  }

//how to handle a Backspace request?
  // if(userInput === keyCode(backspaceKeycode){
  //   backspaceRequest()
    
  // })


//user has typed the correct letter
  if(userInput === charArray[charLetterIndex]){
    //set the class of the current letters span to correct
    charLetterIndex++
  }

  if(userInput !== charArray[charLetterIndex]){
    //set the class of the current letters span to incorrect
    charLetterIndex++
  }
}

setCurrentWord(){
  setState({currentWord: wordsArray[currentWordIndex]})
}

updateCharArray(){
  this.setState({charArray: []})
  charArray.push(this.state.currentWord.split())
}

// backspaceRequest(){
  
//   charLetterIndex--
// }

