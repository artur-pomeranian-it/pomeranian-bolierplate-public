import { onAuthStateChanged, getAuth } from 'firebase/auth';
import { useEffect, useState } from 'react';

export const useAuthStatus = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(undefined);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const auth = getAuth();
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        // User is signed in, see docs for a list of available properties
        // https://firebase.google.com/docs/reference/js/auth.user
        // const uid = user.uid;
        setIsLoggedIn('yes');
        setUser(user);
      } else {
        // User is signed out
        setIsLoggedIn('no');
        setUser(null);
      }
    });
    return () => unsubscribe();
  }, []);

  return [isLoggedIn, user];
};
