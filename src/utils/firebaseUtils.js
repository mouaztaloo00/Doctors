import { initializeApp } from "firebase/app";
import { getMessaging, getToken, onMessage } from "firebase/messaging";

const firebaseConfig = {
  apiKey: "AIzaSyDlizlbKDqvjO9lQzEJLzgmq3HgttNDH9g",
  authDomain: "test-45d8e.firebaseapp.com",
  databaseURL: "https://test-45d8e-default-rtdb.firebaseio.com",
  projectId: "test-45d8e",
  storageBucket: "test-45d8e.appspot.com",
  messagingSenderId: "4402388584",
  appId: "1:4402388584:web:b2ef6719566dcaaab965dd",
  measurementId: "G-KPFPYV9K73"
};

const vapidKey = "BMTinvPbtoNaZvsdHgEaKcvRQgTiPb93cER9MxUMKRsQfeaIZgBHTmNGvcPhUdZRMJUIMNmi0YVtFh-pOugZPlI";

const app = initializeApp(firebaseConfig);
const messaging = getMessaging(app);

export const requestFCMToken = async () => {
  try {
    const permission = await Notification.requestPermission();
    if (permission === "granted") {
      return getToken(messaging, { vapidKey });
    } else {
      throw new Error("Notification permission not granted");
    }
  } catch (err) {
    console.error("Error getting FCM token:", err);
    throw err;
  }
};

export const onMessageListener = () => {
  return new Promise((resolve, reject) => {
    onMessage(messaging, (payload) => {
      resolve(payload);
    }, (err) => {
      reject(err);
    });
  });
};
