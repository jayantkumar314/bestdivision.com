import firebase from 'firebase'
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyAs0MowZsfVBNBV2o09sZPomqJp8Uw0S_g",
    authDomain: "best-division-local.firebaseapp.com",
    projectId: "best-division-local",
    storageBucket: "best-division-local.appspot.com",
    messagingSenderId: "662779401941",
    appId: "1:662779401941:web:443d22c8ea9ea6de4fb45c",
    measurementId: "G-D3MJTQCMXW"
};

// const firebaseApp = firebase.initializeApp(firebaseConfig);
// const db = firebaseApp.firestore();
// const auth = firebase.auth();

// export { db, auth };
firebase.initializeApp(firebaseConfig);
export default firebase