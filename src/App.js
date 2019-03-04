import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

class App extends Component {
  render() {
    return (
      <div className='App'>
        <div className='App-map'>
          <div className='Sector is-a'><p>A</p></div>
          <div className='Sector is-b'><p>B</p></div>
          <div className='Sector is-c'><p>C</p></div>
          <div className='Sector is-d'><p>D</p></div>
          <div className='Sector is-e'><p>E</p></div>
        </div>
      </div>
    );
  }
}

export default App;
