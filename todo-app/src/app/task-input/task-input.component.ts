import { Component, OnInit, Output, EventEmitter, ViewChild, ElementRef, Input } from '@angular/core';
import { TaskInputService } from './task-input.service';


@Component({
  selector: 'app-task-input',
  templateUrl: './task-input.component.html',
  styleUrls: ['./task-input.component.scss']
})
export class TaskInputComponent implements OnInit {
  taskNameInput = '';
  taskDesInput = '' ;

  @Output()
  sendTask = new EventEmitter();

  constructor(private taskInputService: TaskInputService) { }

  ngOnInit(): void {
  }


  handleChangeName (e: any) {
    this.taskNameInput = e.target.value;
    console.log(this.taskNameInput);
  }
  handleChangeDes (e: any) {
    this.taskDesInput = e.target.value;
    console.log(this.taskDesInput);
  }
  handleAdd () {
    if (this.taskNameInput == '') {
      alert('Task name is required')
      return;
    }
    this.sendTask.emit({taskName: this.taskNameInput, taskDes: this.taskDesInput});
    this.taskInputService.postData({taskName: this.taskNameInput, taskDes: this.taskDesInput});
    this.taskNameInput = '';
    this.taskDesInput = '';
    const taskNameEle: any = document.getElementById('taskName');
    taskNameEle? taskNameEle.value = '' : '';
    const taskDesEle: any = document.getElementById('taskDes');
    taskNameEle? taskDesEle.value = '' : '';
  }
}
