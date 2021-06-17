import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { EmployeeCreateDTO, EmployeeDTO } from './employee';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {

  constructor(private http: HttpClient) { }

  private apiUrl = environment.apiUrl + 'employee';

  public getAll(page: number, cantRecordsToShow: number): Observable<any>{
    let params = new HttpParams();
    params = params.append('page', page.toString());
    params = params.append('recordsByPage', cantRecordsToShow.toString());
    return this.http.get<EmployeeDTO[]>(this.apiUrl, {observe: 'response', params});
  }

  public create(employee: EmployeeCreateDTO){
    return this.http.post(this.apiUrl, employee)
  }

  public getById(id: number): Observable<EmployeeDTO>
  {
    return this.http.get<EmployeeDTO>(`${this.apiUrl}/${id}`)
  }


  public edit(id: number, employee: EmployeeCreateDTO){
    return this.http.put(`${this.apiUrl}/${id}`, employee)
  }

}
