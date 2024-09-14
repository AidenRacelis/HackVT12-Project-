import React, { useState } from 'react';
import './Chatbot.css';

const Chatbot = () => {
    const [messages, setMessages] = useState([]);

  const [input, setInput] = useState('');

  const handleSend = () => {
    if (input.trim()) {
      setMessages([...messages, { text: input, isUser: true }]);
      setInput('');
    }
  };

  return (
    <div className="chat-container">
      <h1 className="chat-header">Real Estate Chatbot</h1>
      <div className="chat-box">
        {messages.map((message, index) => (
          <div key={index} className={`message ${message.isUser ? 'user-message' : 'bot-message'}`}>
            {message.text}
          </div>
        ))}
      </div>
      <div className="input-area">
        <input 
          type="text" 
          placeholder="Type your next response to the client" 
          value={input}
          onChange={(e) => setInput(e.target.value)}
          className="chat-input"
        />
        <button onClick={handleSend} className="send-button">Send</button>
      </div>
    </div>
  );
};

export default Chatbot;
