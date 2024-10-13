// AIChatbot.js
import React from 'react';

function AIChatbot() {
  return (
    <div className="ai-chatbot">
      <iframe
        title="AI Chatbot"
        src="https://console.dialogflow.com/api-client/demo/embedded/YOUR_DIALOGFLOW_AGENT_ID"
        width="350"
        height="430"
        style={{ border: 'none' }}
      ></iframe>
    </div>
  );
}

export default AIChatbot;
