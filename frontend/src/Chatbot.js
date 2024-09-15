import React, { useState } from 'react';
import './Chatbot.css';

const Chatbot = () => {
    const [messages, setMessages] = useState([]);
    const [input, setInput] = useState('');


  const handleSend = async () =>{
    if (input.trim()) {
      setMessages([...messages, { text: input, isUser: true }]);
      try {
        // Make a request to the backend to get the AI's response
        const response = await fetch('http://localhost:5000/ask', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ question: input })
        });

        const data = await response.json();
        const aiResponse = data.answer;

        // Add the AI's response to the message array
        setMessages(prevMessages => [
            ...prevMessages, 
            { text: aiResponse, isUser: false }
        ]);

    } catch (error) {
        console.error('Error getting AI response:', error);
        // Handle error (optional)
        setMessages(prevMessages => [
            ...prevMessages, 
            { text: "Something went wrong.", isUser: false }
        ]);
    }

    // Clear the input field
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
          id = "textbox"
          onChange={(e) => setInput(e.target.value)}
          className="chat-input"
          onKeyUp={(e)=> {
            if(e.key === 'Enter') {
              handleSend();
              setInput("");
            }
          }}
        ></input>
        <button onClick={handleSend} className="send-button">Send</button>
      </div>
    </div>
  );
};

export default Chatbot;