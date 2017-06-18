import React from 'react'

class Refresh extends React.Component {

  render(){
    return(
      <button className="refresh-page" onClick={this.refreshPage.bind(this)}>Restart</button>
    )
  }

  refreshPage() {
    window.location.reload();
  }

}

export default Refresh