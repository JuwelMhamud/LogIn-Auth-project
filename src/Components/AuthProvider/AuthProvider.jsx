import {
  FacebookAuthProvider,
  GoogleAuthProvider,
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
} from "firebase/auth";
import { createContext, useEffect, useState } from "react";
import auth from "../../Firebase.config";

export const authContext = createContext(null);

const AuthProvider = ({ children }) => {
  // if any person do regester his name will be In LogInperson variable

  const [LogInPerson, setLogInPerson] = useState(null);

  // show loading when About page is reloaded
  const [loading, setLoading] = useState(true)

  // These thing bring from Firebase for the Fb & google logIn
  const googlePovider = new GoogleAuthProvider();
  const facebookProvider = new FacebookAuthProvider();

  // step 1 : Registration
  const registerUser = (email, password) => {
    setLoading(true)
    return createUserWithEmailAndPassword(auth, email, password);
  };

 // step 2 : Login User
  const loginUser = (email, password) => {
    setLoading(true)
    return signInWithEmailAndPassword(auth, email, password);
  };

  // step 3 : Google Login
  const googleLogin = () => {
    setLoading(true)
    return signInWithPopup(auth, googlePovider);
  };
  
  // step 4 : Facebook Login
  const facebookLogin = () => {
    setLoading(true)
    return signInWithPopup(auth, facebookProvider);
  };

  // step 5 : LogOut User
  const LogOut = () => {
    setLoading(false)
    return signOut(auth);
  };

  // if the person is logIN set his Email on Top , If not than top should be empty
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      if (currentUser) {
        setLogInPerson(currentUser);
        setLoading(false)
      } else {
        setLogInPerson(null);
      }
    });

    return () => {
      unsubscribe();
    };
  }, []);

  const user = {
    registerUser,
    loginUser,
    LogInPerson,
    setLogInPerson,
    googleLogin,
    facebookLogin,
    LogOut,
    loading
  };
  return (
    <div>
      <authContext.Provider value={user}>{children}</authContext.Provider>
    </div>
  );
};

export default AuthProvider;
