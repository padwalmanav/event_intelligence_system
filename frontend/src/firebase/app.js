import { initializeApp } from "firebase/app";

const firebaseConfig = {
  apiKey: "AIzaSyCasGzLhsOwMwqimhoMXJZLpL5vIW4WG-A",
  authDomain: "user--authentication-8adb3.firebaseapp.com",
  projectId: "user--authentication-8adb3",
  storageBucket: "user--authentication-8adb3.firebasestorage.app",
  messagingSenderId: "217643342119",
  appId: "1:217643342119:web:fa9533d32cc6c7bdc5b102"
};

const app = initializeApp(firebaseConfig);

export default app;