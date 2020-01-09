const firebase = require("firebase");
// Required for side-effects
require("firebase/firestore");

var config = {
  apiKey: "AIzaSyAG0xzX00-YH7SQvh5Ml3_Vo_kUuswputg",
  authDomain: "adept-ethos-228717.firebaseapp.com",
  databaseURL: "https://adept-ethos-228717.firebaseio.com",
  projectId: "adept-ethos-228717",
  storageBucket: "adept-ethos-228717.appspot.com",
  messagingSenderId: "520819101031",
  appId: "1:520819101031:web:69137f81ada6826c0f33c2",

  clientID: "520819101031-o9s0th0funobumlv7t1kr8tjejmdj9cv.apps.googleusercontent.com",
  scopes: [
      "email",
      "profile",
      "https://www.googleapis.com/auth/calendar.events"
  ],
  discoveryDocs: [
    "https://www.googleapis.com/discovery/v1/apis/calendar/v3/rest"
  ]
};

firebase.initializeApp(config)

export default firebase;
