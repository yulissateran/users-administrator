import { LIST_USERS_ROUTE } from 'src/app/constants';

export const environment = {
  production: true,
  firebase: {
    apiKey: "AIzaSyA9fqNnW88TvbW4XkF-wGzsySuRIlkjGp8",
    authDomain: "users-administrator.firebaseapp.com",
    databaseURL: "https://users-administrator.firebaseio.com",
    projectId: "users-administrator",
    storageBucket: "users-administrator.appspot.com",
    messagingSenderId: "427198108126",
    appId: "1:427198108126:web:828e11f250fbc939984d4f"
  },
  APP_DOMAIN: 'https://users-administrator.firebaseapp.com',
  IFRAME_ROUTE:'https://users-administrator.firebaseapp.com' + LIST_USERS_ROUTE ,
};
