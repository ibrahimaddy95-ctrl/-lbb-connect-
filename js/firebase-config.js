// === FIREBASE CONFIG ===
// Maye gurbin wannan da config na Firebase project dinki (misali: lbb-market ko sabon project)
const firebaseConfig = {
  apiKey: "AIzaSyDcUrwVfHLlT9OQzremaMYj-xDfsPro0CQ",
  authDomain: "lbb-market.firebaseapp.com",
  projectId: "lbb-market",
  storageBucket: "lbb-market.firebasestorage.app",
  messagingSenderId: "562185302841",
  appId: "1:562185302841:web:542739e255582642612ee8"
};

firebase.initializeApp(firebaseConfig);
const auth = firebase.auth();
const db = firebase.firestore();
const storage = firebase.storage();
