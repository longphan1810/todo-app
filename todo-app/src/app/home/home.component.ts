import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { HomeService } from './home.service';
import { stateInterface, taskInterface } from './home.store';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  providers: [HomeService]
})
export class HomeComponent implements OnInit {
  public chosenTask = {taskName: '', taskDes: ''};

  constructor(private homeService: HomeService) {}

  get state$(): Observable<stateInterface> {
    return this.homeService.state$;
  }

  ngOnInit(): void {
    this.homeService.getData();
  }

  addTask(task: taskInterface) {
    this.homeService.postData(task);
  }

  choseTask(task: taskInterface) {
    this.chosenTask = task;
  }

  handleTop(task: taskInterface) {
    this.chosenTask = this.homeService.moveTop(task);
  }

  handleDown(task: taskInterface) {
    this.chosenTask = this.homeService.moveDown(task)
  }

  handleDelete(task: taskInterface) {
    this.homeService.deleteData(task);
  }
}
