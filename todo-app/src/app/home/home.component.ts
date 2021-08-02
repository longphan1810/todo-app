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

  handleTop(task: any) {
    if (task.taskName == null) {
      return;
    }

    let taskName = task.taskName;
    let taskDes = task.taskDes;
    this.homeService.move({task: task, nextTask: this.state[0]});
    let indexChange: any = this.state.findIndex((value: null) => value == task);
    this.state[indexChange].taskName = this.state[0].taskName;
    this.state[indexChange].taskDes = this.state[0].taskDes;
    this.state[0].taskName = taskName;
    this.state[0].taskDes = taskDes;
    this.chosenTask = this.state[0];
  }

  handleDown(task: any) {
    if (task.taskName == null) {
      return;
    }

    let taskName = task.taskName;
    let taskDes = task.taskDes;
    let indexChange: any = this.state.findIndex((value: null) => value == task);
    if (indexChange == this.state.length -1) {
      return;
    }

    this.homeService.move({task: task, nextTask: this.state[indexChange+1]});
    task.taskName = this.state[indexChange+1].taskName;
    task.taskDes = this.state[indexChange+1].taskDes;
    this.state[indexChange+1].taskName = taskName;
    this.state[indexChange+1].taskDes = taskDes;
    this.chosenTask = this.state[indexChange+1];
  }

  handleDelete(task: any) {
    this.state = this.state.filter((item: any) => item !== task);
    this.homeService.deleteData(task);
  }
}
