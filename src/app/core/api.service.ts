import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  
  private readonly backendBaseUrl = process.env['apiUrl'];

  constructor(private http:HttpClient) { }

  post<T>(endpoint:string, data?:any):Observable<T>{
    const url = `${this.backendBaseUrl}/${endpoint}`;
    return this.http.post<T>(url, data).pipe(catchError(this.handleError));
  }

  private handleError(error:HttpErrorResponse):Observable<never>{
    console.error('API Error:', error);
    return throwError(() => new Error('Something went wrong. Please try again later.'))
  }
}
