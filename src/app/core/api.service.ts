import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, throwError } from 'rxjs';
import { environment } from '../../../environments/environment'; // Import the environment (make sure file env replacements are correct)

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  
  private readonly backendBaseUrl = environment.apiUrl;

  constructor(private http:HttpClient) { }

  post<T>(endpoint:string, data?:any):Observable<T>{
    const url = `${this.backendBaseUrl}/${endpoint}`;
    console.log('Sending POST request to:', url);
    return this.http.post<T>(url, data).pipe(catchError(this.handleError));
  }
  
  get<T>(endpoint: string): Observable<T> {
    const url = `${this.backendBaseUrl}/${endpoint}`;
    console.log('Sending GET request to:', url);
    return this.http.get<T>(url).pipe(catchError(this.handleError));
  }

  private handleError(error:HttpErrorResponse):Observable<never>{
    console.error('API Error:', error);
    return throwError(() => new Error('Something went wrong. Please try again later.'))
  }
}
