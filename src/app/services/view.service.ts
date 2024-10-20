import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Employee } from '../model/employee.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ViewService {

  private apiUrl= 'http://localhost:8080/employee'

  constructor(private http: HttpClient) { }

  public view():Observable<Employee[]>{
    return this.http.get<Employee[]>(this.apiUrl+'/all');
  }

  public delete(id: Number):Observable<any>{
    return this.http.delete(this.apiUrl+`/by-id?empId=${id}`);
  }

  public update(id: Number, updateEmpoyee : Employee):Observable<Employee>{
    return this.http.put<Employee>(this.apiUrl+`/update/${id}`, updateEmpoyee);
  }

}
