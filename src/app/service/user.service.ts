import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiResponse } from '../interface/api-response';
import { Page } from '../interface/page';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private readonly serverUrl: string = 'http://localhost:8080';

  constructor(private http: HttpClient) { }

  // Fazer uma ligação para a API no BackEnd para recuperar a página de usuários
  users$ = (name: string = '', page: number = 0, size: number = 10): Observable<ApiResponse<Page>> => 
    this.http.get<any>(`${this.serverUrl}/users?name=${name}&page=${page}&size=${size}`);
  

  
  // getUser(name: string = '', page: number = 0, size: number = 10): Observable<ApiResponse<Page>> {
  //   return this.http.get<any>(`${this.serverUrl}/users?name=${name}&page=${page}&size=${size}`)
  // }
}
