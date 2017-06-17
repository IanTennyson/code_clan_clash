import React from 'react'

class UserInput extends React.Component {

  render(){
    return(
      <input 
      className="user-input-box" 
      placeholder="Type to begin" 
      onKeyUp={this.triggerInput.bind(this)}
      onClick={this.props.prepareGame}></input>
    )
  }

  triggerInput(event){
    const newChar = event.target.value.slice(-1)
    if(newChar === " "){
      this.props.spaceBar()
    }else{
    this.props.letterInput(newChar)
    }
  }

}

export default UserInput