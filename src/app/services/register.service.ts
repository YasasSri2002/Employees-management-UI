
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Employee } from '../model/employee.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RegisterService {

  constructor(private http: HttpClient) { }

  public registerEmployee(employee: Employee): Observable<Employee> {
    return this.http.post<Employee>('http://localhost:8080/employee', employee);
}

}
