import { useState } from 'react';
import axios from 'axios';

function ChatApp() {
  const [message, setMessage] = useState(''); // Holds the user's input
  const [reply, setReply] = useState(''); // Holds the response from the backend
  const [isLoading, setIsLoading] = useState(false); // Tracks loading state

  // Function to send message to backend
  const sendMessage = async () => {
    setIsLoading(true); // Set loading to true when sending message

    try {
      // Send message to the backend
      const response = await axios.post('http://localhost:5000/chat', { message });

      // Handle successful response
      setReply(response.data.reply); // Update reply state with response from backend
    } catch (error) {
      // Handle error (e.g., show error message to user)
      console.error('Error:', error.message);
    } finally {
      setIsLoading(false); // Set loading to false after the request finishes (whether successful or not)
    }
  };

  return (
    <div className="chat-box">
      <h2>Chat with Us</h2>
      <textarea 
        value={message} 
        onChange={e => setMessage(e.target.value)} 
        placeholder="Type your message..." 
      />
      <button onClick={sendMessage} disabled={isLoading}>
        {isLoading ? 'Sending...' : 'Send'}
      </button>

      {/* Displaying the reply */}
      <div>
        {reply && (
          <div>
            <h3>Reply:</h3>
            <p>{reply}</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default ChatApp;
