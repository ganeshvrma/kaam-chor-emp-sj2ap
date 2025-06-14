// import { Injectable } from '@angular/core';

// @Injectable({
//   providedIn: 'root'
// })
// export class ApiService {

//   constructor() { }
// }
import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
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
  Getmbbyuserid(userId: number): Observable<any> {
  return this.http.get<any>(`${this.apiUrl}/Employer_Api/Getmbbyuserid/${userId}`);
}
 getEmployerData(userId: number): Observable<any> {
  return this.http.get<any>(`${this.apiUrl}/Employer_Api/getEmployerData/${userId}`);
}
getEmployerCompanyData(userId: number): Observable<any> {
  return this.http.get<any>(`${this.apiUrl}/Employer_Api/getEmployerCompanyData/${userId}`);
}
getEmployerProfile(userId: number): Observable<any> {
  return this.http.get<any>(`${this.apiUrl}/Employer_Api/getEmployerProfile/${userId}`);
}
// updateEmployerEmail(userId: number,email:string): Observable<any> {
//   return this.http.put<any>(`${this.apiUrl}/Employer_Api/updateEmployerEmail`,{userId,email});
// }
updateEmployerEmail(userId: number, email: string): Observable<any> {
  const url = `${this.apiUrl}/Employer_Api/updateEmployerEmail`;
  const params = new HttpParams()
    .set('user_id', userId.toString())
    .set('email', email);

  return this.http.put<any>(url, {}, { params }); // Note: empty body
}

}
