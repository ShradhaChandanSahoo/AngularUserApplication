import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from './user';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  baseUrl = 'http://localhost:8080/api/user';
  
// dependency injection
constructor(private http: HttpClient) {}

getAllUsers(): Observable<User[]> {
  return this.http.get<User[]>(`${this.baseUrl}/all`);
}

createUser(user: User): Observable<any> {
  return this.http.post(`${this.baseUrl}/save`, user, {
    responseType: 'text',
  });
}

deleteUser(id : number) : Observable<any>{
  return this.http.delete(`${this.baseUrl}/remove/${id}`,{ responseType : 'text'
  });
}
editUserDetail(id:number){
  return this.http.get(`${this.baseUrl}/one/${id}`);
}
getSearchUsers(keyword:String): Observable<any> {
  return this.http.get<User[]>(`${this.baseUrl}/search/${keyword}`);
}
}
