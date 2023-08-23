import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Observable} from "rxjs";
import {Response} from "../Interface/response";
import {Employee} from "../Interface/employee";

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {
  private baseUrl = "http://localhost:8080/api/v1/employees"

  constructor(private http: HttpClient) {
  }

  getEmployeeList(): Observable<Response> {
    return this.http.get<Response>(this.baseUrl, {
      headers: new HttpHeaders({
        'custom-header':'sanket '
      })
    })
  }

  createEmployee(employee: Employee): Observable<any> {
    return this.http.post(this.baseUrl, employee)
  }

  updateEmployee(employee: Employee, id: number): Observable<Response> {
    return this.http.put<Response>(`${this.baseUrl}/${id}`, employee)

  }

  getEmployeeById(id: number): Observable<Response> {
    return this.http.get<Response>(`${this.baseUrl}/${id}`)
  }

  deleteEmployeeById(id: number): Observable<Response> {
    return this.http.delete<Response>(`${this.baseUrl}/${id}`);
  }

}
