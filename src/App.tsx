import React from 'react';
import { fbAuth } from './services/firebase';

import logo from './logo.svg';
import './App.css';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.tsx</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

fbAuth.onAuthStateChanged(user => {
  if (user) {
    console.log('Welcome ', user.displayName);
  } else {
    console.log('No user logged in.');
  }
});

export default App;
