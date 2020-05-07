import React from 'react'
import Homepage from './body/homepage/landing.jsx';

export class Home extends React.Component {

  constructor(props) {
    super(props);
    this.state = {

    }

  }

  componentDidMount() {

  }

  render() {

    return ( 
      <div className = "full-height" >
          <Homepage />
      </div>
    )
  }
}

export default Home