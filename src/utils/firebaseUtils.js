import { initializeApp } from "firebase/app";
import { getMessaging, getToken, onMessage } from "firebase/messaging";

const firebaseConfig = {
  apiKey: "AIzaSyBTmPOmYvwhKdANZSvpITbhgEiqgKZtab8",
  authDomain: "appsandmore-training-6c847.firebaseapp.com",
  projectId: "appsandmore-training-6c847",
  storageBucket: "appsandmore-training-6c847.appspot.com",
  messagingSenderId: "56909297717",
  appId: "1:56909297717:web:1bc78a38c0f30a0f2e197c",
  measurementId: "G-KYLK26W2ZY"
};

const vapidKey = "BPSaMt94J9JyYBN7nby_r0sEkZoPPodtQDh0629OFjJnqXPeVfKSuAl0MuE4MwuR54ecXEvHGWBUcabXHPsiEHE";

const app = initializeApp(firebaseConfig);
const messaging = getMessaging(app);

export const requestFCMToken = async () => {
  try {
    const permission = await Notification.requestPermission();
    if (permission === "granted") {
      const token = await getToken(messaging, { vapidKey });
      if (token) {
        return token;
      } else {
        throw new Error("Failed to get FCM token");
      }
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
