import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import * as io from 'socket.io-client';
import { MessegeModel } from '../../../shared/messege.model';

@Injectable({
  providedIn: 'root'
})
export class AppService {
  private url = 'http://localhost:3333';
  private socket;

  constructor(private http: HttpClient) {}

  public getHistory(): Observable<MessegeModel[]> {
    return this.http.get<MessegeModel[]>('/api/chat');
  }

  public connect(): Observable<MessegeModel> {
    return new Observable(observer => {
      this.socket = io(this.url);

      this.socket.on('event', data => {
        console.log(data);
        observer.next(data);
      });
    });
  }

  public emit(msg: string) {
    this.socket.emit('event', { msg } as MessegeModel);
  }

}
