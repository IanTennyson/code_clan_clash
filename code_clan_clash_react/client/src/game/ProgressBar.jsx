const ProgressBar = require('progressbar.js')

import React from 'react'
import Score from './Score'

class MyProgressBar extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      running: false
    }
  }

  componentDidUpdate() {
    if(this.props.hasGameStarted && !this.state.running) {
      this.progressBar(container);
      this.setState({running: true});
    }
  }

  render(){
    return(
      <div id="container" className="progress-bar"></div>
    )
  }

  progressBar(container) {
    const bar = new ProgressBar.Circle(container, {
      color: '#aaa',
      strokeWidth: 14,
      trailWidth: 14,
      duration: 60000,
      text: {
        autoStyleContainer: false
      },
      from: { color: '#aaa', width: 14 },
      to: { color: '#333', width: 14 },
    // Set default step function for all animate calls
      step(state, circle) {
        circle.path.setAttribute('stroke', state.color);
        circle.path.setAttribute('stroke-width', state.width);

        // var value = Math.round(circle.value() * {this.props.wpm}); CAN I PUT MY WPM IN HERE?
        // if (value === 0) {
        //   circle.setText('WPM');
        // } else {
        //   circle.setText(value);
        // }
      }
    });
// bar.text.style.fontFamily = '"Raleway", Helvetica, sans-serif';
// bar.text.style.fontSize = '2rem';

    bar.animate(1.0);  // Number from 0.0 to 1.0
  }
}

export default MyProgressBar;


