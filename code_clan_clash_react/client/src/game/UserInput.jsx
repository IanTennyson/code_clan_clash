import React from 'react'

const userInput = (props) => <input className="user-input-box" placeholder="Type to begin" onKeyUp={props.callback.bind(this)}></input>

export default userInput