import { initializeApp } from 'firebase/app'
import { getFirestore } from 'firebase/firestore'

const firebaseConfig = {
  apiKey: "AIzaSyB3P1jXZtMrgjGts-3sHa7lYhhFoyWSRpk",
  authDomain: "housemarket-3f211.firebaseapp.com",
  projectId: "housemarket-3f211",
  storageBucket: "housemarket-3f211.appspot.com",
  messagingSenderId: "982723247904",
  appId: "1:982723247904:web:502df9dc3779679fcf6145"
};

initializeApp(firebaseConfig)
export const db = getFirestore()