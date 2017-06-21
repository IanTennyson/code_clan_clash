import React from 'react'

class Words extends React.Component{

  constructor(props) {
    super(props);
  }

  componentDidMount() {
  }

  render(){
    const word = Object.values(this.props.words).map((word, index) => {
      return <span 
        ref={"wordspan" + index}
        className={word.status} 
        key={index}>
        {word.value}
        &nbsp;</span>
    }) 

  
  return (
    <div className="mapped-word">
      {word}
    </div>
  );

  }


}




export default Words;