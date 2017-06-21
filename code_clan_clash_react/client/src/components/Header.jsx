import React from 'react'

const Header = (props) => <div className='header-div'>
  <h1>{props.header}</h1>
  <h4 className="sub-header">{props.startTag}<span className="key-word">{props.keyword}</span>{props.endTag}</h4>
</div>

export default Header