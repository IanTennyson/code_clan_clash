import React from 'react'

class EightBitMan extends React.Component {

  render(){
    const jsonError = this.props.error
    const errorObj = JSON.parse(jsonError).errors;
    let chat = Object.keys(errorObj).map((type, index) => {
      return <li key={index}>{type}: {errorObj[type][0]} </li>
    });

  return(
    <div className="speech-bubble">
      <div className="speech">
      <ul>
        {chat[0]}
      </ul>
      </div>
    </div>
    )
  }
}

export default EightBitMan