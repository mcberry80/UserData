import { useState, useEffect } from 'react';
import { firestore } from './firebase';

function MessageList() {
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    const unsubscribe = firestore.collection('messages')
      .onSnapshot((snapshot) => {
        const messages = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setMessages(messages);
      });

    return () => unsubscribe();
  }, []);

  return (
    <div>
      <h2>Messages</h2>
      <ul>
        {messages.map((message) => (
          <li key={message.id}>{message.text}</li>
        ))}
      </ul>
    </div>
  );
}

export default MessageList;
