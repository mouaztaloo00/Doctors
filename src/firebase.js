// src/firebase.js
import { initializeApp } from 'firebase/app';
import { getMessaging, getToken } from 'firebase/messaging';

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyBTmPOmYvwhKdANZSvpITbhgEiqgKZtab8",
    authDomain: "appsandmore-training-6c847.firebaseapp.com",
    projectId: "appsandmore-training-6c847",
    storageBucket: "appsandmore-training-6c847.appspot.com",
    messagingSenderId: "56909297717",
    appId: "1:56909297717:web:1bc78a38c0f30a0f2e197c",
    measurementId: "G-KYLK26W2ZY"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Get a reference to the Firebase Messaging service
const messaging = getMessaging(app);

export { messaging, getToken };
