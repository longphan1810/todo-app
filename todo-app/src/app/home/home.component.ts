import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { HomeService } from './home.service';
import { ListTask, TaskForm } from './home.store';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  providers: [HomeService]
})
export class HomeComponent implements OnInit {
  public chosenTask = {taskName: '', taskDes: ''};

  constructor(private homeService: HomeService) {}

  get state$(): Observable<ListTask> {
    return this.homeService.state$;
  }

  ngOnInit(): void {
    this.homeService.getData();
  }

  addTask(task: TaskForm) {
    this.homeService.postData(task);
  }

  choseTask(task: TaskForm) {
    this.chosenTask = task;
  }

  handleTop(task: TaskForm) {
    this.chosenTask = this.homeService.moveTop(task);
  }

  handleDown(task: TaskForm) {
    this.chosenTask = this.homeService.moveDown(task)
  }

  handleDelete(task: TaskForm) {
    this.homeService.deleteData(task);
  }
}
