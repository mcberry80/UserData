import { useState, useEffect } from 'react';
import PropTypes from 'prop-types'
import { firestore } from './firebase';

function MessageList({ user }) {
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    const unsubscribe = firestore
      .collection('messages')
      .where('uid', '==', user.uid) // Filter messages by user's uid
      .onSnapshot((snapshot) => {
        const messages = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setMessages(messages);
      });

    return () => unsubscribe();
  }, [user]);

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

MessageList.propTypes = {
  user: PropTypes.object.isRequired,
};

export default MessageList;
