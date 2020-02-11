export const AUTH_MODULE_ROUTE: string = '/auth';
export const LOGIN_ROUTE: string = AUTH_MODULE_ROUTE +'/';
export const REGISTER_ROUTE: string = AUTH_MODULE_ROUTE +'/register';
export const ADMIN_MODULE_ROUTE: string = '/admin';
export const CREATE_USERS_ROUTE: string = ADMIN_MODULE_ROUTE+ '/create-users';
export const LIST_USERS_ROUTE: string = ADMIN_MODULE_ROUTE+ '/list-users';
// export const LIST_USERS_DOMAIN: string = 'http://localhost:4200';
// export const CREATE_USERS_DOMAIN: string = 'http://localhost:4200';
export const USER_ADMIN_EMAIL:string = 'yulissa.lteran@gmail.com';
export const USER_ADMIN_PASSWORD:string = 'YulissaT*@';


//LOGIN ERRORS 
export const NOT_USER_FOUND_ERROR_CODE:string = 'auth/user-not-found';
export const NOT_USER_FOUND_ERROR_MESSAGE:string = 'There is no user record corresponding to this identifier. The user may have been deleted.';
export const NOT_USER_FOUND_ERROR_DISPLAY_MESSAGE:string = 'El email ingresado no se encuentra registrado';

export const WRONG_PASSWORD_ERROR_CODE:string = 'auth/wrong-password';
export const WRONG_PASSWORD_ERROR_MESSAGE:string = 'The password is invalid or the user does not have a password.';
export const WRONG_PASSWORD_ERROR_DISPLAY_MESSAGE:string = 'La contraseña ingresada no es correcta';

export const INVALID_EMAIL_ERROR_CODE:string = 'auth/invalid-email';
export const INVALID_EMAIL_ERROR_MESSAGE:string = 'The email address is badly formatted.';
export const INVALID_EMAIL_ERROR__DISPLAY_MESSAGE:string = 'El correo ingresado es incorrecto';

export const DEFAULT_ERROR__DISPLAY_MESSAGE:string = 'Sucedió un error, por favor intente de nuevo más tarde';

export const ACTION_USER_UPDATE:string = 'update';
export const ACTION_USER_REMOVE:string = 'remove';
export const ACTION_USER_ENABLE:string = 'enable';
export const ACTION_CREATE_USER:string = 'create';

export const ACTION_INIT_LIST_USER:string = 'initList';
export const ACTION_LOADED_IFRAME:string = 'initList';

