import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EmployeeServiceService {

baseUrl = "http://localhost:3000/employee";

  constructor(private http: HttpClient) { }

  getAll(): Observable<any> {
    return this.http.get("http://localhost:3000/employee");
  }

getEmployeeById(employeeId: number): Observable<any> {
  return this.http.get("http://localhost:3000/employee/" + employeeId)
}

createEmployee(employeeData:any): Observable<any> {
  return this.http.post("http://localhost:3000/employee", employeeData)
}

updateEmployee(id: number, employeeData: any): Observable<any>{
  return this.http.put(this.baseUrl+'/'+id, employeeData)
}


deleteEmployee(employeeId: number): Observable<any> {
  return this.http.delete(this.baseUrl+ '/' + employeeId)
}

}
