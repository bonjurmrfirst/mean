import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AppService {

  constructor(private http: HttpClient) {}

  public getHistory(): Observable<string[]> {
    return this.http.get<string[]>('/api/chat');
  }

}
