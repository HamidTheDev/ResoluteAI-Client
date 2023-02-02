import React from "react";
import { createContext } from "react";
import { app } from "../Authprovider/firebase.init";
import {
  getAuth,
  signInWithPopup,
  GoogleAuthProvider,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  onAuthStateChanged,
} from "firebase/auth";
import { useState } from "react";
import { useEffect } from "react";

export const Usercontext = createContext(app);

//auth is universal
const auth = getAuth(app);

//different provider
const provider = new GoogleAuthProvider();

const Authprovider = ({ children }) => {
  var [cart, setCart] = useState(0);

  const [user, setUser] = useState(null);

  const [loader, setloader] = useState(true);

  const [id, setId] = useState('')

  //google signup
  const google = () => {
    setloader(true);
    return signInWithPopup(auth, provider);
  };

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
    google,
    manual,
    signin,
    loader,
    cart,
    setCart,
    setId,
  };

  return (
    <Usercontext.Provider value={authinfo}>{children}</Usercontext.Provider>
  );
};

export default Authprovider;
