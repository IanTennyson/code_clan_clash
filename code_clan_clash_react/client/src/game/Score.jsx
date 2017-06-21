import React from 'react'

class Score extends React.Component {
  constructor(props){
    super(props)
  }

  render(){
    return(
    <div className="wpm">
      <h4>WPM<br/><br/>{this.props.netWPM}</h4>
    </div>
    )
  }
}

export default Score