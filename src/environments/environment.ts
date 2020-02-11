import { LIST_USERS_ROUTE } from 'src/app/constants';

// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  firebase: {
    apiKey: "AIzaSyA9fqNnW88TvbW4XkF-wGzsySuRIlkjGp8",
    authDomain: "users-administrator.firebaseapp.com",
    databaseURL: "https://users-administrator.firebaseio.com",
    projectId: "users-administrator",
    storageBucket: "users-administrator.appspot.com",
    messagingSenderId: "427198108126",
    appId: "1:427198108126:web:828e11f250fbc939984d4f"
  },
  APP_DOMAIN: ' http://localhost:4200/',
  IFRAME_ROUTE:' http://localhost:4200/' + LIST_USERS_ROUTE ,
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
