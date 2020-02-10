import { defer } from 'rxjs';

export function asyncError<T>(errorObject: any) {
  return defer(() => Promise.reject(errorObject));
}