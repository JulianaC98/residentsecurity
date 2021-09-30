const firebaseConfig = {
    apiKey: "AIzaSyCNIxjGRDU73wVTfPSZYZg3TMCq47TBpdo",

    authDomain: "test4-e0a6e.firebaseapp.com",

    databaseURL: "https://test4-e0a6e-default-rtdb.firebaseio.com",

    projectId: "test4-e0a6e",

    storageBucket: "test4-e0a6e.appspot.com",

    messagingSenderId: "837040724351",

    appId: "1:837040724351:web:5d4ab2cf0b25798591224a"

};
// Initialize Firebase
const app = firebase.initializeApp(firebaseConfig);
const db = firebase.database(app);
