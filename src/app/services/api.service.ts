// import { Injectable } from '@angular/core';

// @Injectable({
//   providedIn: 'root'
// })
// export class ApiService {

//   constructor() { }
// }
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  private baseUrl = 'https://ek-reps.com/kaam-chor/FormApi'; // Replace with your backend URL
  private apiUrl = `${environment.baseUrl}`;
  constructor(private http: HttpClient) {}

  submitJob(data: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/step1`, data);
  }
  submitCompany(data: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/step2`, data);
  }
  submitBasic(data: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/step3`, data);
  }
   getJobCategory(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/Api/get_jobcategory`);
  }
  getEduQual(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/Api/get_edu_qual`);
  }
  getLanguages(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/Api/get_languages`);
  }
  getIndustryType(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/Api/get_industrytype`);
  }
   getEmpProfile(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/Api/get_emp_profile`);
  }
  getStates(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/Api/get_states`);
  }
  getCitiesByState(stateId: number): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/Api/get_cities_by_state/${stateId}`);
  }
  getSkills(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/Api/get_skills`);
  }
   getEmployerPlans(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/Employer_Api/getEmployerPlans`);

  }
  
}
