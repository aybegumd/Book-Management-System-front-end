import { initializeApp } from 'firebase/app';
import { getAuth, createUserWithEmailAndPassword } from 'firebase/auth';

const firebaseConfig = {
  apiKey: "AIzaSyC5Znva8UkF9_uyrB_gpC4DNfKdPOsPOi4",
  authDomain: "book-management-app-7a187.firebaseapp.com",
  projectId: "book-management-app-7a187",
  storageBucket: "book-management-app-7a187.appspot.com",
  messagingSenderId: "1081216001697",
  appId: "1:1081216001697:web:318286a589c42b2654b2e0",
  measurementId: "G-F90BRMLL5E"
};

const app = initializeApp(firebaseConfig);

const auth = getAuth(app);

export { auth, createUserWithEmailAndPassword };
