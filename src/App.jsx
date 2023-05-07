import { useState } from 'react';
import { auth,firebase, firestore, googleAuthProvider } from './firebase';

function App() {
  const [user, setUser] = useState(null);
  const [message, setMessage] = useState('');

  const signInWithGoogle = () => {
    auth.signInWithPopup(googleAuthProvider)
      .then((result) => {
        setUser(result.user);
      })
      .catch((error) => {
        console.log(error.message);
      });
  };

  const signOut = () => {
    auth.signOut()
      .then(() => {
        setUser(null);
      })
      .catch((error) => {
        console.log(error.message);
      });
  };

  const handleMessageChange = (event) => {
    setMessage(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (user && message) {
      firestore.collection('messages').add({
        uid: user.uid,
        displayName: user.displayName,
        message: message,
        createdAt: firebase.firestore.FieldValue.serverTimestamp(),
      })
      .then(() => {
        setMessage('');
      })
      .catch((error) => {
        console.log(error.message);
      });
    }
  };

  return (
    <div>
      <h1>My App</h1>
      {user ?
        <div>
          <p>Welcome, {user.displayName}</p>
          <button onClick={signOut}>Sign Out</button>
          <form onSubmit={handleSubmit}>
            <label>
              Message:
              <input type="text" value={message} onChange={handleMessageChange} />
            </label>
            <button type="submit">Submit</button>
          </form>
        </div>
        :
        <button onClick={signInWithGoogle}>Sign in with Google</button>
      }
    </div>
  );
}

export default App;
