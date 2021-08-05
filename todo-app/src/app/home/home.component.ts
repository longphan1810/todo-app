import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { HomeService } from './home.service';
import { listTask, taskForm } from './home.store';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  providers: [HomeService]
})
export class HomeComponent implements OnInit {
  public chosenTask = {taskName: '', taskDes: ''};

  constructor(private homeService: HomeService) {}

  get state$(): Observable<listTask> {
    return this.homeService.state$;
  }

  ngOnInit(): void {
    this.homeService.getData();
  }

  addTask(task: taskForm) {
    this.homeService.postData(task);
  }

  choseTask(task: taskForm) {
    this.chosenTask = task;
  }

  handleTop(task: taskForm) {
    this.chosenTask = this.homeService.moveTop(task);
  }

  handleDown(task: taskForm) {
    this.chosenTask = this.homeService.moveDown(task)
  }

  handleDelete(task: taskForm) {
    this.homeService.deleteData(task);
  }
}
