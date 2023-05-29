import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { firestore } from './firebase';

function MessageList({ user }) {
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    const unsubscribe = firestore
      .collection('messages')
      .where('uid', '==', user.uid) // Filter messages by the user's UID
      .orderBy('createdAt', 'desc') // Order messages by creation time (newest first)
      .onSnapshot((snapshot) => {
        const messages = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setMessages(messages);
      });

    return () => unsubscribe();
  }, [user]);

  const handleDelete = (messageId) => {
    firestore.collection('messages').doc(messageId).delete();
  };

  return (
    <div>
      <h2>Messages</h2>
      <ul>
        {messages.map((message) => (
          <li key={message.id}>
            {message.text}
            <button onClick={() => handleDelete(message.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
}


MessageList.propTypes = {
  user: PropTypes.object.isRequired,
};

export default MessageList;
