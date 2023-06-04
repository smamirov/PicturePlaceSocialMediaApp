// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';

const app = initializeApp(
  {
    apiKey: "AIzaSyD-hKSnSxGOuINLcPg3S3VdoJfBPlatwaI",
    authDomain: "instagramcloneauthentication.firebaseapp.com",
    projectId: "instagramcloneauthentication",
    storageBucket: "instagramcloneauthentication.appspot.com",
    messagingSenderId: "792865567376",
    appId: "1:792865567376:web:6ea426c4fc0da562d35e15"
  }
); 
const db = getFirestore(app);
const auth = getAuth(app);
const storage = getStorage(app);

export { db, auth, storage };