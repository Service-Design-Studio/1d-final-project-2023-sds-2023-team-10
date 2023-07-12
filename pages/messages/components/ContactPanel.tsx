import React, { useState } from "react";

const ContactPanel = () => {
    const [messages, setMessages] = useState([
        { text: "Hello, how can I assist you today?", sender: "assistant" },
        { text: "Hi! I have a question about your product.", sender: "user" },
        { text:"Nahhh",sender:"user"}
        // add more static messages for the demo
    ]);

    const [inputMessage, setInputMessage] = useState("");

    const sendTextUser = () => {
      if (inputMessage.trim() !== "") {
        setMessages([...messages, {text: inputMessage, sender: "user"}]);
        setInputMessage(""); // clear the input after sending
      }
    }

  return (
    <div>
      <h2>Chat</h2>
      <div style={{height: '400px', overflow: 'auto'}}>
          {messages.map((message, index) => (
              <div key={index} style={{textAlign: message.sender === 'assistant' ? 'left' : 'right'}}>
                  <p>{message.text}</p>
              </div>
          ))}
      </div>
      <div style={{marginTop: '10px'}}>
          <input 
              value={inputMessage}
              onChange={(e) => setInputMessage(e.target.value)}
              type='text' 
              placeholder='Type your message here...' 
              style={{width: "80%", marginRight: "10px"}}
          />
          <button onClick={sendTextUser}>Send</button>
      </div>
    </div>
  );
};

export default ContactPanel;