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
    let indexChange: any = this.listTask.findIndex((value: null) => value == task);
    this.listTask[indexChange] = this.listTask[0];
    this.listTask[0] = task;
  }
  handleDown(task: any) {
    if (task.taskName == null) {
      return;
    }

    let indexChange: any = this.listTask.findIndex((value: null) => value == task);
    this.listTask[indexChange] = this.listTask[indexChange+1];
    this.listTask[indexChange+1] = task;
    let indexOnDatabase = this.listTask.length - indexChange -1;
    this.myservice.moveDown({index: indexOnDatabase, task: task, nextTask: this.listTask[indexChange]}).subscribe((data: any) => console.log(data));
  }
  handleDelete(task: any) {
    this.listTask = this.listTask.filter((item: any) => item !== task);
    this.myservice.deleteData(task).subscribe((data) => console.log(data));
  }
}
