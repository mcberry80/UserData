import { useAuthState } from 'react-firebase-hooks/auth';
import { auth, googleAuthProvider } from './firebase';

function Login() {
  const [user] = useAuthState(auth);

  const signInWithGoogle = async () => {
    try {
      await auth.signInWithPopup(googleAuthProvider);
    } catch (error) {
      console.error(error);
    }
  };

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

export default Login;
