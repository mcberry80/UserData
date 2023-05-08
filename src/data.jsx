import { useState } from 'react';
import { firestore } from './firebase';
import MessageList from './MessageList';

function Data() {
  const [data, setData] = useState('');

  const handleChange = (e) => {
    setData(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    firestore.collection('messages').add({ text: data });
    setData('');
  };

  return (
    <div>
      <h2>Enter Data</h2>
      <form onSubmit={handleSubmit}>
        <input type="text" value={data} onChange={handleChange} />
        <button type="submit">Submit</button>
      </form>
      <MessageList />
    </div>
  );
}

export default Data;
