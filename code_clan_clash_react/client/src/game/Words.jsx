import React from 'react'

class Words extends React.Component{

  constructor(props) {
    super(props);
  }

  componentDidMount() {
    // console.log("loaded");
    // console.log(this.refs);
    // console.log(Object.keys(this.refs));
  }
  // Object.values(this.state.wordsArrayObj[this.state.currentWordIndex])[0]
  render(){
    // console.log("this.props.words", Object.values(this.props.words))
    const word = Object.values(this.props.words).map((word, index) => {
      // console.log("value: ", value, "index: ", index)
      // console.log("Word: ", word)
      return <span 
        ref={"wordspan" + index}
        className={word.status} 
        key={index}>
        {word.value}
        </span>
    }) 

    // this.props.words.map((word, index) => {
    //   return <span 
    //     ref={"wordspan" + index}
    //     // className={this.assignClass.bind(this)} 
    //     //onLoad={this.assignClass.bind(this)}
    //     key={index}>
    //     {word}
    //     </span>
    // })
  
  return (
    <div className="mapped-word">
      {word}
    </div>
  );

  }


}




export default Words;