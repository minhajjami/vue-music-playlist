import firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";
import "firebase/storage"

const firebaseConfig = {
    apiKey: "AIzaSyAZYXBQ4manEBhB8utn85Bbx4-gRO1vVQU",
    authDomain: "yolo-music.firebaseapp.com",
    projectId: "yolo-music",
    storageBucket: "yolo-music.appspot.com",
    messagingSenderId: "1072454620623",
    appId: "1:1072454620623:web:c335abc230e15eccf9eeba"
  };

  
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

//Intialize Service
const projectFireStore= firebase.firestore()
const projectAuth= firebase.auth()
const projectStorage= firebase.storage()

//Initialize timestamp
const timestamp = firebase.firestore.FieldValue.serverTimestamp

export {projectAuth,projectFireStore,projectStorage,timestamp}