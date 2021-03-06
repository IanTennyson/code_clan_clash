import React from 'react'
import TypeWriter from '../components/TypeWriter'

class UserInput extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      url: '../audio/main.mp3',
    }
  }

  render(){

    return(
      <div>
    
      <input
      className="user-input-box" 
      placeholder="Press Return to Begin"
      onClick={this.props.prepareGame}
      onKeyDown={this.triggerKeyboardInput.bind(this)}
      onKeyUp={this.triggerStartOfTest.bind(this)}
      ></input>
     
      </div>
    )
  }


  triggerStartOfTest(event){
    if(this.props.hasGameStarted === true)return;
    if(event.keyCode === 13){
    this.props.startTest()
    }
  }

  triggerKeyboardInput(event){
    while (this.props.hasGameStarted === false) return;
    const allUserText = event.target.value
    const word = event.target.value.split(" ")
    const newUserWord = word.slice(-1).pop()

    switch(event.keyCode){
      case 32:
        this.props.spaceBar(newUserWord)

        break;
      case 8:
        this.props.triggerBackspace(allUserText)
        break;
 
    }

  }

}

export default UserInput

// <TypeWriter url={this.state.url} />