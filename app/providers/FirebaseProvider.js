/* eslint arrow-body-style: 0 */

import RNFirebase from "react-native-firebase";

const FirebaseProvider = {
  init: (store) => {
    this._store = store;
    this._firebase = RNFirebase.app();
  },

  checkIfUserExists: (uid) => {
    const httpsCallable = this._firebase
      .functions()
      .httpsCallable('checkIfUserExists');

    httpsCallable({ uid })
      .then(({ data }) => {
        console.log(data.someResponse); // hello world
      })
      .catch(httpsError => {
        console.log(httpsError.code); // invalid-argument
        console.log(httpsError.message); // Your error message goes here
        console.log(httpsError.details.foo); // bar
      });
  }
};

export default FirebaseProvider;
