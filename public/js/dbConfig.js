import { initializeApp } from 'firebase/app';
import { getDatabase } from "firebase/database";

const firebaseConfig = {

    apiKey: "AIzaSyDfcI-msQyaezXdlWtkr_WQDMjQTyPXiMw",

    authDomain: "residentsecurity-5f4ec.firebaseapp.com",

    databaseURL: "https://residentsecurity-5f4ec-default-rtdb.firebaseio.com",

    projectId: "residentsecurity-5f4ec",

    storageBucket: "residentsecurity-5f4ec.appspot.com",

    messagingSenderId: "1060748774683",

    appId: "1:1060748774683:web:f02f4bf9848570ed9897be"

};


// Initialize Firebase
const app = firebase.initializeApp(firebaseConfig);
const db = firebase.database(app);
