import React from 'react'

class Score extends React.Component {
  constructor(props){
    super(props)
  }

  render(){
    return(
    <div>
      <h4>Gross WPM: {this.props.grossWPM}</h4>
      <h4>Net WPM: {this.props.netWPM}</h4>
    </div>
    )
  }
}

export default Score