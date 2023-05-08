import { useState } from 'react';
import { auth, googleAuthProvider } from './firebase';
import Data from './data';

function App() {
  const [user, setUser] = useState(null);

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

  return (
    <div>
      <h1>My App</h1>
      {user ?
        <div>
          <p>Welcome, {user.displayName}</p>
          <button onClick={signOut}>Sign Out</button>
          <Data />
        </div>
        :
        <button onClick={signInWithGoogle}>Sign in with Google</button>
      }
    </div>
  );
}

export default App;
