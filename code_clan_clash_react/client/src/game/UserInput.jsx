import React from 'react'

class UserInput extends React.Component {

  render(){
    return(
      <input
      className="user-input-box" 
      placeholder="Type to begin"
      onClick={this.props.prepareGame}
      onKeyUp={this.triggerInput.bind(this)}
      ></input>
    )
  }

  triggerInput(event){
    const newChar = event.target.value.slice(-1)
    if(event.keyCode === 8){
      this.props.triggerBackspace()
      return;
    }
    if(newChar === " "){
      this.props.spaceBar()
      return;
    }else{
    this.props.letterInput(newChar)
    }
  }

}

export default UserInput