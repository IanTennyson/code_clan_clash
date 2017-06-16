import React from 'react'

class UserInput extends React.Component {

  render(){
    return(
      <input className="user-input-box" placeholder="Type to begin" onKeyUp={this.triggerInput.bind(this)}></input>
    )
  }

  triggerInput(event){
    const newChar = event.target.value.slice(-1)
    this.props.callback(newChar)
  }

}

export default UserInput