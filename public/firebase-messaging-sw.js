importScripts('https://www.gstatic.com/firebasejs/8.2.0/firebase-app.js');
importScripts('https://www.gstatic.com/firebasejs/8.2.0/firebase-messaging.js');

firebase.initializeApp({
    apiKey: "AIzaSyBTmPOmYvwhKdANZSvpITbhgEiqgKZtab8",
    authDomain: "appsandmore-training-6c847.firebaseapp.com",
    projectId: "appsandmore-training-6c847",
    storageBucket: "appsandmore-training-6c847.appspot.com",
    messagingSenderId: "56909297717",
    appId: "1:56909297717:web:1bc78a38c0f30a0f2e197c",
    measurementId: "G-KYLK26W2ZY"
});

const messaging = firebase.messaging();

messaging.onBackgroundMessage(function(payload) {
    console.log('[firebase-messaging-sw.js] Received background message ', payload);
    const notificationTitle = payload.notification.title;
    const notificationOptions = {
        body: payload.notification.body,
        icon: payload.notification.icon
    };

    self.registration.showNotification(notificationTitle, notificationOptions);
});
