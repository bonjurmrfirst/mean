import { Component, OnInit } from '@angular/core';
import { AppService } from './app.service';
import { Observable } from 'rxjs';
import { MessegeModel } from '../../../shared/messege.model';

@Component({
  selector: 'mean-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  public history: Observable<MessegeModel[]>;
  public chat: MessegeModel[] = [];

  constructor(private appService: AppService) {}

  public ngOnInit(): void {
    this.history = this.appService.getHistory();
    this.appService.connect().subscribe(event => {
      this.chat.push(event);
      console.log(this.chat);
    });
  }

  public onSend(msg: string): void {
    this.appService.emit(msg);
  }

}
