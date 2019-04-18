import { Component, OnInit } from '@angular/core';
import { AppService } from './app.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'mean-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  public history: Observable<string[]>;
  public chat: string[] = [];

  constructor(private appService: AppService) {}

  public ngOnInit(): void {
    this.history = this.appService.getHistory();
    this.appService.connect().subscribe(event => {
      this.chat.push(event as any);
      console.log(this.chat);
    });
  }

  public onSend(msg: string): void {
    this.appService.emit(msg);
  }

}
