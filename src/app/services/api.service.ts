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
  private baseUrl = 'https://staging.ekarigar.com/kaam-chor/FormApi'; // Replace with your backend URL
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
updateEmployerEmail(userId: number, email: string) {
  return this.http.put<any>(`${this.apiUrl}/Employer_Api/updateEmployerEmail`, {
    user_id: userId,
    email: email
  });
}
 emailbyuserid(userId: number): Observable<any> {
  return this.http.get<any>(`${this.apiUrl}/Employer_Api/emailbyuserid/${userId}`);
}
employer_jobs(data: any,userId: number,page:number,limit:number): Observable<any> {
    return this.http.post(`${this.baseUrl}/employer_jobs`, {data,
      user_id:userId,
      page,
      limit,
    });
  }
  
  savedCandidates(data: any,userId: number,page:number,limit:number): Observable<any> {
    return this.http.post(`${this.baseUrl}/savedCandidates`, {data,
      employer_id:userId,
      page,
      limit,
    });
  }
  candidateDetail(data: any,userId: number): Observable<any> {
    return this.http.post(`${this.apiUrl}/Employer_Api/candidateDetail`, {data,
      candidate_id:userId,
      
    });
  }
  candidates(data: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/Employer_Api/candidates`, {data
    });
  }
  appliedCandidates(data: any,userId: number,page:number,limit:number,job_id:number): Observable<any> {
    return this.http.post(`${this.apiUrl}/Employer_Api/appliedCandidates`, {data,
      employer_id:userId,
      page,
      limit,
      job_id
    });
  }
  employer_inactive_job_detail(job_id:number): Observable<any> {
    return this.http.get(`${this.apiUrl}/Employer_Api/job_details/${job_id}`);
  }
  save_candidate(userId: number,candidate_id:number): Observable<any> {
    return this.http.post(`${this.apiUrl}/Employer_Api/save_candidate`, {
      employer_id:userId,
      candidate_id,
     
    });
  }
}
