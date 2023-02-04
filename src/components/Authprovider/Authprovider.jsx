import React from "react";
import { createContext } from "react";
import {

  signInWithPopup,
  GoogleAuthProvider,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  getAuth,
} from "firebase/auth";
import { useState } from "react";
import { useEffect } from "react";
import { app } from "./firebase.init";

export const Usercontext = createContext(app);

//auth is universal
const auth = getAuth(app);

//different provider
const provider = new GoogleAuthProvider();

const Authprovider = ({ children }) => {

  const [user, setUser] = useState(null);

  const [loader, setloader] = useState(true);



  //manual
  const manual = (email, password, displayName) => {
    setloader(true);
    return createUserWithEmailAndPassword(auth, email, password, displayName);
  };

  useEffect(() => {
    const unSubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setloader(false);
    });

    return () => unSubscribe();
  }, []);

  const signin = (email, password) => {
    setloader(true);
    return signInWithEmailAndPassword(auth, email, password);
  };

  const authinfo = {
    user,
    auth,
    manual,
    signin,
    loader,
  };

  return (
    <Usercontext.Provider value={authinfo}>{children}</Usercontext.Provider>
  );
};

export default Authprovider;
