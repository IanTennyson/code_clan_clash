import React from 'react'

class Words extends React.Component{

  render(){
    const word = this.props.words.map((word, index) => {
      return <span key={index}>{word}</span>
    })
    console.log("WORDS", word[0])
    console.log("WORDS", this.props.words)
  
  return (
    <div className="mapped-word">
      {word}
    </div>
  );

  }
}

export default Words;