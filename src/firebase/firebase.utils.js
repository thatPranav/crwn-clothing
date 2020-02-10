import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/auth";

const config = {
  apiKey: "AIzaSyBPBXniNWPSxFhKzBcy0XuQpWYok4WzqIc",
  authDomain: "crwn-db-58dbf.firebaseapp.com",
  databaseURL: "https://crwn-db-58dbf.firebaseio.com",
  projectId: "crwn-db-58dbf",
  storageBucket: "crwn-db-58dbf.appspot.com",
  messagingSenderId: "949334785395",
  appId: "1:949334785395:web:f6d132d4322b402524d906",
  measurementId: "G-VF04WT3VH9"
};

export const createUserProfileDocument = async (userAuth, additionalData) => {
  if (!userAuth) return;
  const userRef = firestore.doc(`users/${userAuth.uid}`);
  const snapShot = await userRef.get();
  if (!snapShot.exists) {
    const { displayName, email } = userAuth;
    const createdAt = new Date();

    try {
      await userRef.set({
        displayName,
        email,
        createdAt,
        ...additionalData
      });
    } catch (error) {
      console.log("Error creating user!", error.message);
    }
  }
  return userRef;
};

firebase.initializeApp(config);

export const auth = firebase.auth();
export const firestore = firebase.firestore();

const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({ prompt: "select_account" });
export const signInWithGoogle = () => auth.signInWithPopup(provider);

export default firebase;
