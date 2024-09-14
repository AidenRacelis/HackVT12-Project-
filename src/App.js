import React from 'react';
import './App.css';
import Chatbot from './Chatbot'; 
import Review from './Review';
import SearchHouses from './components/SearchHouses';


function App() {
  return (
    <div className="App">
      <Chatbot />
      <SearchHouses />
      <Review />
    </div>
  );
}

export default App;
