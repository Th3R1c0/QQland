// Import the functions you need from the SDKs you need
import { initializeApp, getApps, getApp } from 'firebase/app';
import { getDatabase } from 'firebase/database';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: 'AIzaSyAe6WeTKRhQwY2rG_7iRVd1RViV8dHMlWg',
  authDomain: 'qqpre-78bab.firebaseapp.com',
  projectId: 'qqpre-78bab',
  databaseURL: 'https://qqpre-78bab-default-rtdb.firebaseio.com/',
  storageBucket: 'qqpre-78bab.appspot.com',
  messagingSenderId: '918547372113',
  appId: '1:918547372113:web:d278afee530b18e23c4070',
};

// Initialize Firebase
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();

const database = getDatabase(app);

export { database };
