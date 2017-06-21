import React from 'react'
import GameBox from '../game/GameBox'
// import ProgressBar from './ProgressBar'

class Clash extends React.Component {
  render(){
    return(
      <GameBox user={this.props.user} socket={this.props.socket} users={this.props.users} />
    )
  }
}

export default Clash