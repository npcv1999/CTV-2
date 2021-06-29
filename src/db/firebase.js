import firebase from 'firebase';
require('firebase/auth');
import 'firebase/database';
import 'firebase/firestore';
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: 'AIzaSyAWTUF79UCwQKW-Ok4RwvhgK79Atu17FGo',
  authDomain: 'congtimviec.firebaseapp.com',
  databaseURL: 'https://congtimviec.firebaseio.com',
  projectId: 'congtimviec',
  storageBucket: 'congtimviec.appspot.com',
  messagingSenderId: '722208165186',
  appId: '1:722208165186:web:04ecf4a37eaa2cb474ccdb',
  measurementId: 'G-PTXT5DDH53',
};
firebase.initializeApp(firebaseConfig);
export default firebase;
