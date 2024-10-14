import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Employee } from '../model/employee.model';
import { Observable } from 'rxjs';





@Injectable({
  providedIn: 'root'
})
export class EmployeeService {

  private apiUrl = 'http://localhost:8080/employee';

  constructor(private http: HttpClient) {
    
   }

   addEmployee(employee: Employee): Observable<Employee> {
    // Perform POST request
    return this.http.post<Employee>(this.apiUrl, employee);
  }


}
