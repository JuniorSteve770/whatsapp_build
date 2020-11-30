import firebase from 'firebase/app'
import 'firebase/firestore'
import 'firebase/auth'


const firebaseConfig = {
    apiKey: "AIzaSyBK5WkC80DoNj5V-g9Fks8DOIbZxisTcNI",
    authDomain: "whatsapp-clone-react-dcec4.firebaseapp.com",
    databaseURL: "https://whatsapp-clone-react-dcec4.firebaseio.com",
    projectId: "whatsapp-clone-react-dcec4",
    storageBucket: "whatsapp-clone-react-dcec4.appspot.com",
    messagingSenderId: "537100702014",
    appId: "1:537100702014:web:a8889c6dfcad64fa395c6f",
    measurementId: "G-GRVNXFRPSV"
  };

  // Here we initialize the firebaseConfig and store in the const FirebaseApp
  // var app = firebase.initializeApp({ ... });
  const firebaseApp = firebase.initializeApp(firebaseConfig);
  
  // Here we create another const that will access the firestore instance of the firebase config
  const db = firebaseApp.firestore();
  
  // Here is the Authentification Handler
  const auth = firebase.auth();

  // Here is the google Authentification process
  const provider = new firebase.auth.GoogleAuthProvider();

  // Here we Export the needed credentials
  export { auth, provider };
  export default db;
