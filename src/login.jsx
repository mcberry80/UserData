import PropTypes from 'prop-types';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from './firebase';

function Login({ signInWithGoogle }) {
  const [user] = useAuthState(auth);

  return (
    <div>
      {user ? (
        <button onClick={() => auth.signOut()}>Sign Out</button>
      ) : (
        <button onClick={signInWithGoogle}>Sign in with Google</button>
      )}
    </div>
  );
}

Login.propTypes = {
  signInWithGoogle: PropTypes.func.isRequired,
};


export default Login;
