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

  constructor(private appService: AppService) {}

  public ngOnInit(): void {
    this.history = this.appService.getHistory();
    this.appService.connect().subscribe(event => {
      console.log(event);
    });
  }

  public onSend(msg: string): void {
    this.appService.emit(msg);
  }

}
