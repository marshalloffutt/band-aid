import React from 'react';
import { Button } from 'react-bulma-components/full';
import logo from './logo.svg';
import './App.scss';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <Button color="info" size="large" rounded outlined>
          Wowza!
        </Button>
      </header>
    </div>
  );
}

export default App;
