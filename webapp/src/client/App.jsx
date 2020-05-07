import React from 'react';
import Routes from './routes';
import { connect } from 'react-redux';
// import { withRouter } from 'react-router-dom';

function App() {
  return (
    <div className="App">
      <Routes/> 
    </div>
  );

}

export default connect(
  null
)(App)
