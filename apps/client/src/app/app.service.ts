import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import * as io from 'socket.io-client';

@Injectable({
  providedIn: 'root'
})
export class AppService {
  private url = 'http://localhost:3333';
  private socket;

  constructor(private http: HttpClient) {}

  public getHistory(): Observable<string[]> {
    return this.http.get<string[]>('/api/chat');
  }

  public connect() {
    return new Observable(observer => {
      this.socket = io(this.url);

      this.socket.on('event', data => {
        observer.next(data);
      });
    });
  }

  public emit() {
    this.socket.emit('event', { msg: 'my msg' });
  }

}
