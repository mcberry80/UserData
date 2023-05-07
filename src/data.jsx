import { useState } from 'react';
import { firestore } from './firebase';

function Data() {
  const [data, setData] = useState('');
  const [savedData, setSavedData] = useState(null);

  const handleChange = (e) => {
    setData(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Submitting data:', data);
    firestore.collection('data').add({ text: data })
      .then(() => {
        setData('');
        console.log('Data saved successfully');
      })
      .catch((error) => {
        console.log('Error saving data:', error.message);
      });
  };

  const handleRetrieve = () => {
    firestore.collection('data').get()
      .then((querySnapshot) => {
        const data = [];
        querySnapshot.forEach((doc) => {
          data.push({ id: doc.id, ...doc.data() });
        });
        setSavedData(data);
      })
      .catch((error) => {
        console.log('Error retrieving data:', error.message);
      });
  };

  return (
    <div>
      <h2>Enter Data</h2>
      <form onSubmit={handleSubmit}>
        <input type="text" value={data} onChange={handleChange} />
        <button type="submit">Submit</button>
      </form>
      <h2>Saved Data</h2>
      {savedData ?
        <ul>
          {savedData.map((item) => (
            <li key={item.id}>{item.text}</li>
          ))}
        </ul>
        :
        <p>No saved data</p>
      }
      <button onClick={handleRetrieve}>Retrieve Data</button>
    </div>
  );
}

export default Data;
