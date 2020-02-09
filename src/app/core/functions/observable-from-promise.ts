import { Observable } from 'rxjs';

export const fromPromise = (
  promise,
  handleResponse,
  handleError
) =>{
 return new Observable(subscriptor => {
    promise
      .then(response => subscriptor.next(handleResponse? handleResponse(response):response ))
      .catch(error => subscriptor.error(handleError? handleError(error): error));
  });
}