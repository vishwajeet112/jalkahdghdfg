import React, { useState } from 'react';
import '../css/Chatbot.css'; 

const Chatbot = () => {
  const [messages, setMessages] = useState([
    { id: 1, text: 'Hello!', type: 'received' },
    { id: 2, text: 'Hi there!', type: 'sent' },
    { id: 3, text: 'How are you?', type: 'received' },
    // Add more messages as needed
  ]);
  const sendMessage = (text) => {
    const newMessage = { id: messages.length + 1, text, type: 'sent' };
    setMessages([...messages, newMessage]);
  };

  const [showChatBox, setShowChatBox] = useState(true);

  const toggleChatBox = () => {
    setShowChatBox(!showChatBox);
  };

  return (
    <div className={`chat-box ${showChatBox ? 'visible' : 'hidden'}`}>
      <div className="chat-toggle" onClick={toggleChatBox}>
        <div className="toggle-icon">×</div>
      </div>
      <div className="chat-header">
        <p>Chat With Me</p>
        <p>We're Online!</p>
        
      </div>
      <div className="chat-body">
         <div className="chat-messages">
        {messages.map((message) => (
          <div key={message.id} className={`message ${message.type}`}>
            {message.text}
          </div>
        ))}
      </div>
      <div className="message-input">
      <input
          type="text"
          placeholder="Type your message..."
          onKeyDown={(e) => {
            if (e.key === 'Enter') {
              sendMessage(e.target.value);
              e.target.value = '';
            }
          }}
        />
      </div>
      </div>
    </div>
  );
};

export default Chatbot;

