import { Component, OnInit } from '@angular/core';
import { HomeService } from './home.service';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  providers: [HomeService]
})
export class HomeComponent implements OnInit {
  public state$: any;
  public state: any = [];
  public chosenTask: any = {};

  constructor(private homeService: HomeService) { }

  ngOnInit(): void {
    this.homeService.getData();
    this.state$ = this.homeService.state$
    this.state$.subscribe((state: any) => this.state = state);
  }

  addTask(task: any) {
    this.homeService.postData(task);
  }

  choseTask(task: any) {
    this.chosenTask = task;
  }

  handleTop(task: any, state: any) {
    this.homeService.moveTop(task, state);
    this.chosenTask = this.state[0];
  }

  handleDown(task: any, state: any) {
    let indexChange: any = this.state.findIndex((value: null) => value == task);
    this.homeService.moveDown(task, state)
    this.chosenTask = this.state[indexChange+1];
  }

  handleDelete(task: any) {
    if (task.taskName == null) {
      return;
    }
    this.state = this.state.filter((item: any) => item !== task);
    this.homeService.deleteData(task);
  }
}
