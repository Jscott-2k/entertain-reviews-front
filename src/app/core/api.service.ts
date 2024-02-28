import { HttpClient, HttpErrorResponse, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  
  constructor(private http:HttpClient) { }

  post<T>(endpoint: string, data?: any, headers?: HttpHeaders): Observable<T> {
    const url = `/${endpoint}`; 
    console.log('Sending POST request to:', url);
    const options = { headers };
    return this.http.post<T>(url, data, options).pipe(catchError(this.handleError));
  }

  get<T>(endpoint: string, params?: HttpParams, headers?: HttpHeaders): Observable<T> {
    const url = `/${endpoint}`;
    console.log('Sending GET request to:', url);
    const options = { params, headers };
    return this.http.get<T>(url, options).pipe(catchError(this.handleError));
  }

  put<T>(endpoint: string, data?: any, headers?: HttpHeaders): Observable<T> {
    const url = `/${endpoint}`; 
    console.log('Sending PUT request to:', url);
    const options = { headers };
    return this.http.put<T>(url, data, options).pipe(catchError(this.handleError));
  }

  delete<T>(endpoint: string, headers?: HttpHeaders): Observable<T> {
    const url = `/${endpoint}`; 
    console.log('Sending DELETE request to:', url);
    const options = { headers };
    return this.http.delete<T>(url, options).pipe(catchError(this.handleError));
  }
  
  private handleError(error: HttpErrorResponse): Observable<never> {
    console.error('API Error:', error);
    return throwError(() => new Error('Something went wrong. Please try again later.'));
  }
}
