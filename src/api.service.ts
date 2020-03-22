import { Injectable } from '@angular/core';
import {catchError} from "rxjs/operators";
import {of} from "rxjs";
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private http: HttpClient) { }


  get(url, param?) {
    return this.http.get(url).pipe(
      catchError(error => of(this.errorHandler(error, param))))
  }

  errorHandler(error, param) {
    let errorMessage = {};
    if (error.error) {
      errorMessage = [{error: `No user with the name: ${param} or api call limit has been reached`}]
    } else {
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    return errorMessage
  }
}
