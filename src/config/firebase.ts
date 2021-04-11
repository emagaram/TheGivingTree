import firebase from "firebase/app"
import "firebase/firestore"
import "firebase/auth"
require("firebase/auth")
require("firebase/functions")

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
var firebaseConfig = {
  apiKey: "AIzaSyCb_wZ_s4FPzQbiNO038pmdofXZ8Jf5exA",
  authDomain: "givingtree-83cad.firebaseapp.com",
  projectId: "givingtree-83cad",
  storageBucket: "givingtree-83cad.appspot.com",
  messagingSenderId: "965186628172",
  appId: "1:965186628172:web:8877a1afa79788366862e9",
  measurementId: "G-MTWGYX0V1N",
}
// Initialize Firebase
const app = firebase.initializeApp(firebaseConfig)
//firebase.analytics();
firebase.firestore().settings(<any>{ timestampsInSnapshots: true })
export const auth = app.auth()
export default firebase
