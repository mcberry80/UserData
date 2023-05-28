import { useState } from 'react';
import { firestore } from './firebase';
import PropTypes from 'prop-types';

function Data({ user }) {
  const [message, setMessage] = useState('');

  const handleChange = (e) => {
    setMessage(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (user && message) {
      const messageData = {
        uid: user.uid,
        displayName: user.displayName,
        message: message,
        createdAt: firestore.FieldValue.serverTimestamp(),
      };

      firestore
        .collection('messages')
        .add(messageData)
        .then(() => {
          setMessage('');
        })
        .catch((error) => {
          console.log(error.message);
        });
    }
  };

  Data.propTypes = {
    user: PropTypes.shape({
      uid: PropTypes.string.isRequired,
      displayName: PropTypes.string.isRequired,
    }),
  };

  return (
    <div>
      <h2>Enter Data</h2>
      <form onSubmit={handleSubmit}>
        <input type="text" value={message} onChange={handleChange} />
        <button type="submit">Submit</button>
      </form>
    </div>
  );
}

export default Data;
