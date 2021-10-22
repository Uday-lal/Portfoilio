// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDQF4hBd1-BmBUi7r45xGydUWy3k51-wpY",
  authDomain: "portfolio-f440e.firebaseapp.com",
  projectId: "portfolio-f440e",
  storageBucket: "portfolio-f440e.appspot.com",
  messagingSenderId: "198067260840",
  appId: "1:198067260840:web:14d0e32aade6eddc98e19d"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const storage = getStorage(app);
export default storage;
