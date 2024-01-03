import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";
import {
  getDatabase,
  set,
  ref,
  update,
  push,
  onValue,
} from "firebase/database";

const firebaseConfig = {
  apiKey: "AIzaSyC7BzrXjoscu2U-SRzJ0uNaT9g12KU__Js",
  authDomain: "inventory-724e3.firebaseapp.com",
  databaseURL: "https://inventory-724e3-default-rtdb.firebaseio.com",
  projectId: "inventory-724e3",
  storageBucket: "inventory-724e3.appspot.com",
  messagingSenderId: "407444423023",
  appId: "1:407444423023:web:41c227971e7a4e9420689a",
  measurementId: "G-GQKLCZF3VZ",
};

const app = initializeApp(firebaseConfig);
export const db = getDatabase(app);
// export const db=getFirestore(app)
export const auth = getAuth(app);
export const storage = getStorage(app);
