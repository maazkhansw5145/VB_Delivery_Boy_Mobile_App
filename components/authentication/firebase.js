import * as firebase from "firebase";
import "@firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyBbzt5t9rg2kCEIBPn8_OGW1Y50tHGJ6sk",
  authDomain: "virtual-bazaar-326821.firebaseapp.com",
  projectId: "virtual-bazaar-326821",
  storageBucket: "virtual-bazaar-326821.appspot.com",
  messagingSenderId: "1043238640150",
  appId: "1:1043238640150:web:978e30d299008adf433337",
  measurementId: "G-VG5H3Q3GLD",
};
if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
} else {
  firebase.app();
}

export default firebase;
