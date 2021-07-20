import { Component, OnInit, Output, EventEmitter, ViewChild, ElementRef, Input } from '@angular/core';
import { MserviceService } from '../mservice.service';


@Component({
  selector: 'app-task-input',
  templateUrl: './task-input.component.html',
  styleUrls: ['./task-input.component.scss']
})
export class TaskInputComponent implements OnInit {
  task_name = '';
  task_des = '' ;

  @Output()
  sendTask = new EventEmitter();

  constructor(private myservice: MserviceService) { }

  ngOnInit(): void {
  }


  handleChangeName (e: any) {
    this.task_name = e.target.value;
    console.log(this.task_name);
  }
  handleChangeDes (e: any) {
    this.task_des = e.target.value;
    console.log(this.task_des);
  }
  handleAdd () {
    if (this.task_name == '') {
      alert('Task name is required')
      return;
    }
    this.sendTask.emit({taskName: this.task_name, taskDes: this.task_des});
    this.task_name = '';
    this.task_des = '';
    const taskNameEle: any = document.getElementById('taskName');
    taskNameEle? taskNameEle.value = '' : '';
    const taskDesEle: any = document.getElementById('taskDes');
    taskNameEle? taskDesEle.value = '' : '';
  }
}
