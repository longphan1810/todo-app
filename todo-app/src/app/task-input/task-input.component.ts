import { Component, OnInit, Output, EventEmitter } from '@angular/core';

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

  constructor() { }

  ngOnInit(): void {
  }

  handleChangeName (e: any) {
    this.taskNameInput = e.target.value;
  }

  handleChangeDes (e: any) {
    this.taskDesInput = e.target.value;
  }

  handleAdd () {
    if (this.taskNameInput == '') {
      alert('Task name is required')
      return;
    }

    this.sendTask.emit({taskName: this.taskNameInput, taskDes: this.taskDesInput});
    this.taskNameInput = '';
    this.taskDesInput = '';
    const taskNameEle: any = document.getElementById('taskName');
    taskNameEle? taskNameEle.value = '' : '';
    const taskDesEle: any = document.getElementById('taskDes');
    taskNameEle? taskDesEle.value = '' : '';
  }
}
