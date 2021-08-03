import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { HomeService } from './home.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  providers: [HomeService]
})
export class HomeComponent implements OnInit {

  public chosenTask = {taskName: null, taskDes: null};

  constructor(private homeService: HomeService) {}

  get state$(): Observable<{taskName: null, taskDes: null}[]> {
    return this.homeService.state$;
  }

  ngOnInit(): void {
    this.homeService.getData();
  }

  addTask(task: any) {
    this.homeService.postData(task);
  }

  choseTask(task: any) {
    this.chosenTask = task;
  }

  handleTop(task: any) {
    this.chosenTask = this.homeService.moveTop(task);
  }

  handleDown(task: any) {
    this.chosenTask = this.homeService.moveDown(task)
  }

  handleDelete(task: any) {
    this.homeService.deleteData(task);
  }
}
