import React from 'react';
import './App.css';
import logo from './logo.svg';

function App() {

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          API proxy configured for development pointing to http://localhost:4000
        </p>
      </header>
    </div>
  );
}

export default App;
