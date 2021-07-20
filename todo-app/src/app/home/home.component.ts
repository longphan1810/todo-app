import { Component, OnInit } from '@angular/core';
import { MserviceService } from '../mservice.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  constructor(private myservice: MserviceService) { }
  listTask: any = [];
  chosenTask: any = {};
  ngOnInit(): void {
    this.myservice.getData().subscribe((data) => {

      this.listTask = data;
      console.log(this.listTask);
    });
    console.log(this.listTask);
  }

  addTask(task: any) {
    console.log(task);
    // this.listTask = [task, ...this.listTask];
    this.myservice.postData(task).subscribe((task: any) => this.listTask=[task[0],...this.listTask]);
  }
  choseTask(task: any) {

    this.chosenTask = task;
    console.log(this.chosenTask);
  }

  handleTop(task: any) {
    if (task.taskName == null) {
      return;
    }
    let taskName = task.taskName;
    let taskDes = task.taskDes;
    this.myservice.move({task: task, nextTask: this.listTask[0]}).subscribe((data: any) => console.log(data));
    let indexChange: any = this.listTask.findIndex((value: null) => value == task);
    this.listTask[indexChange].taskName = this.listTask[0].taskName;
    this.listTask[indexChange].taskDes = this.listTask[0].taskDes;
    this.listTask[0].taskName = taskName;
    this.listTask[0].taskDes = taskDes;
    this.chosenTask = this.listTask[0];
  }
  handleDown(task: any) {
    if (task.taskName == null) {
      return;
    }
    let taskName = task.taskName;
    let taskDes = task.taskDes;
    let indexChange: any = this.listTask.findIndex((value: null) => value == task);
    if (indexChange == this.listTask.length -1) {
      return;
    }
    this.myservice.move({task: task, nextTask: this.listTask[indexChange+1]}).subscribe((data: any) => console.log(data));
    task.taskName = this.listTask[indexChange+1].taskName;
    task.taskDes = this.listTask[indexChange+1].taskDes;
    this.listTask[indexChange+1].taskName = taskName;
    this.listTask[indexChange+1].taskDes = taskDes;
    this.chosenTask = this.listTask[indexChange+1];
  }
  handleDelete(task: any) {
    this.listTask = this.listTask.filter((item: any) => item !== task);
    this.myservice.deleteData(task).subscribe((data) => console.log(data));
  }
}
