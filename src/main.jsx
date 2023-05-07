import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { auth } from './firebase';

auth.onAuthStateChanged((user) => {
  ReactDOM.render(
    <React.StrictMode>
      <App user={user} />
    </React.StrictMode>,
    document.getElementById('root')
  );
});
