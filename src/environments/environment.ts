// This file can be replaced during build by using the `fileReplacements` array.
// `ng build` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  apiUrl: 'http://localhost:8080/api',
  authURL: 'http://localhost:8080/api/auth',
  firebaseConfig: {
    apiKey: 'AIzaSyBJnTGWCZQ-QWuZxq-naCa54jpY2rFBO4Y',
    authDomain: 'portfolio-43f55.firebaseapp.com',
    projectId: 'portfolio-43f55',
    storageBucket: 'portfolio-43f55.appspot.com',
    messagingSenderId: '188994707136',
    appId: '1:188994707136:web:7f6925b1477462f4ee9725',
  },
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/plugins/zone-error';  // Included with Angular CLI.
