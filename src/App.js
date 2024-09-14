import React from 'react';
import './App.css';
import Chatbot from './Chatbot'; 
import Profile from './Profile';
import Settings from './Settings';
import About from './About' ;

function App() {
  return (
    <div className="App">
      <Chatbot />
      <Profile />
      <Settings />
      <About />
    </div>
  );
}

export default App;
