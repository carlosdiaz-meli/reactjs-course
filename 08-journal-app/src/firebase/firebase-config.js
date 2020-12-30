import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

const firebaseConfig = {
    apiKey: "AIzaSyDHuFqLZZQ5eNnoHRuYeAvdR3n6D-b9Zrs",
    authDomain: "cd-react-apps-course.firebaseapp.com",
    projectId: "cd-react-apps-course",
    storageBucket: "cd-react-apps-course.appspot.com",
    messagingSenderId: "9696558144",
    appId: "1:9696558144:web:c1cdaf11fd488d03dbf3a5"
};

firebase.initializeApp(firebaseConfig);

const db = firebase.firestore();
const googleAuthProvider = new firebase.auth.GoogleAuthProvider();

export {
    db,
    googleAuthProvider,
    firebase
}