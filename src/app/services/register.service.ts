
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Employee } from '../model/employee.model';
import { catchError, Observable, throwError } from 'rxjs';
import { ErrorResponse } from '../model/errorResponse.model';


@Injectable({
  providedIn: 'root'
})
export class RegisterService {

  constructor(private http: HttpClient) { }

  private handleError(error: HttpErrorResponse) {
    if (error.status === 400) {
      // Handle custom error for EmployeeAlreadyExistException
      return throwError(() => new Error(error.error.errorMessage));
    }
    return throwError(() => new Error('Something went wrong, please try again later.'));
  }
  
  public registerEmployee(employee: Employee): Observable<ErrorResponse> {
    return this.http.post<ErrorResponse>('http://localhost:8080/employee', employee).pipe(catchError(this.handleError));
}

  

}
