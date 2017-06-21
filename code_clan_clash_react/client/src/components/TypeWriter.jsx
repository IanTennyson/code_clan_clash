import React from 'react';
import Sound from 'react-sound';
 
class TypeWriter extends React.Component {
  constructor(props){
    super(props)
  }

  render() {
    return <Sound {...props.url} />;
  }
}