import React from 'react'

class Words extends React.Component{

  render(){
    const word = this.props.words.map((word, index) => {
      return <span key={index}>{word}</span>
    })
  
  return (
    <div className="mapped-word">
      {word}
    </div>
  );

  }
}

export default Words;