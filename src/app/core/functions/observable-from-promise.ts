import { Observable } from "rxjs";

export const fromPromise = (
  promise,
  handleResponse,
  handleError
): Observable<any> => {
  return new Observable(subscriptor => {
    promise
      .then(
        response => {
          return subscriptor.next(
            handleResponse ? handleResponse(response) : response
          );
        },
        error => subscriptor.error(handleError ? handleError(error) : error)
      )
      .catch(error => {
        console.log("ERROR PROMISE", error);
        return subscriptor.error(handleError ? handleError(error) : error);
      });
  });
};
