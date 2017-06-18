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

// Gross WPM calc = 
// all letters (including spaces) typed 
//     divided by 5 
// divided by 1 (1 meaning 1 min)

//Net WPM calc = 
// all letters (including spaces) typed 
//     divided by 5 

//    -UNCORRECTED Errors
// divided by 1 (1 meaning 1 min)