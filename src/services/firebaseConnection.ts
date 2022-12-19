import firebase from "firebase/compat/app";
import "firebase/compat/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyADhoZLjvei3Sw5Q2RmTySo4Rnkic3DZ5s",
  authDomain: "board-6d454.firebaseapp.com",
  projectId: "board-6d454",
  storageBucket: "board-6d454.appspot.com",
  messagingSenderId: "975864902219",
  appId: "1:975864902219:web:42ccbae84e1b6bc41513ce",
  measurementId: "G-BS003Z7GVG",
};

// Initialize Firebase
if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}

export default firebase;
