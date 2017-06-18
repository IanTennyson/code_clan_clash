const ProgressBar = require('progressbar.js')

import React from 'react'


class MyProgressBar extends React.Component {
  
//length

  render(){
    if(this.props.gameStarted === true){
      this.progressBar(container)
    }
    return(
    <div id="container" className="progress-bar"></div>
    )
  }

      finished(){
        this.props.finished()
      }

      progressBar(container) {
      const bar = new ProgressBar.Circle(container, {
        color: '#aaa',
        strokeWidth: 4,
        trailWidth: 1,
        duration: 60000,
        text: {
          autoStyleContainer: false
        },
        from: { color: '#aaa', width: 1 },
        to: { color: '#333', width: 4 },
        // Set default step function for all animate calls

    step(state, circle) {
      circle.path.setAttribute('stroke', state.color);
      circle.path.setAttribute('stroke-width', state.width);



    }
  });
  // bar.text.style.fontFamily = '"Raleway", Helvetica, sans-serif';
  // bar.text.style.fontSize = '2rem';

  bar.animate(1.0);  // Number from 0.0 to 1.0
  }
}

export default MyProgressBar;