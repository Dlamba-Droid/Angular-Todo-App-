import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UserserviceService {

  constructor(private http: HttpClient) { }
  url = 'http://localhost:3000/signup'
  
  getContent(){
   return this.http.get('http://localhost:3000/signup');

  }
}
