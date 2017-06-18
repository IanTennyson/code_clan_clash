const ProgressBar = require('progressbar.js')

import React from 'react'


class MyProgressBar extends React.Component {



  render(){
    if(this.props.hasGameStarted === true){
      this.progressBar(container)
    }
    return(
    <div id="container" className="progress-bar"></div>
    )
  }



      progressBar(container) {
      const bar = new ProgressBar.Circle(container, {
        color: '#aaa',
        strokeWidth: 4,
        trailWidth: 1,
        easing: 'easeInOut',
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

      var value = Math.round(circle.value() * 100);
      if (value === 0) {
        circle.setText('');
      } else {
        circle.setText(value);
      }

    }
  });
  bar.text.style.fontFamily = '"Raleway", Helvetica, sans-serif';
  bar.text.style.fontSize = '2rem';

  bar.animate(1.0);  // Number from 0.0 to 1.0
  }
}

export default MyProgressBar;