import { initializeApp } from 'firebase/app';
import { getMessaging, getToken } from 'firebase/messaging';

const firebaseConfig = {
    apiKey: "AIzaSyBTmPOmYvwhKdANZSvpITbhgEiqgKZtab8",
    authDomain: "appsandmore-training-6c847.firebaseapp.com",
    projectId: "appsandmore-training-6c847",
    storageBucket: "appsandmore-training-6c847.appspot.com",
    messagingSenderId: "56909297717",
    appId: "1:56909297717:web:1bc78a38c0f30a0f2e197c",
    measurementId: "G-KYLK26W2ZY"
};

const app = initializeApp(firebaseConfig);

const messaging = getMessaging(app);

export { messaging, getToken };
