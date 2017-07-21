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
    var bar = new ProgressBar.Circle(container, {
      color: '#aaa',
      strokeWidth: 20,
      trailWidth: 20,
      duration: 60000,
      text: {
        autoStyleContainer: false
      },
      from: { color: '#aaa', width: 20 },
      to: { color: '#333', width: 20 },

      step(state, circle) {
        circle.path.setAttribute('stroke', state.color);
        circle.path.setAttribute('stroke-width', state.width);

      }
    });

    bar.animate(1.0);  // Number from 0.0 to 1.0
  }

}

export default MyProgressBar;


