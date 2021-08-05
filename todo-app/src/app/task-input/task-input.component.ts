import { Component, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-task-input',
  templateUrl: './task-input.component.html',
  styleUrls: ['./task-input.component.scss']
})

export class TaskInputComponent implements OnInit {
  taskNameInput: string | null | undefined = '';
  taskDesInput = '' ;

  @Output()
  sendTask = new EventEmitter();

  ngOnInit(): void {
  }

  handleChangeName (e: Event) {
    this.taskNameInput = (e.target as HTMLInputElement).value;
  }

  handleChangeDes (e: Event) {
    this.taskDesInput = (e.target as HTMLInputElement).value;
  }

  handleAdd () {
    if (!this.taskNameInput) {
      alert('Task name is required')
      return;
    }

    this.sendTask.emit({taskName: this.taskNameInput, taskDes: this.taskDesInput});
    this.taskNameInput = '';
    this.taskDesInput = '';
    const taskNameEle: HTMLElement | null = document.getElementById('taskName');
    taskNameEle? (taskNameEle as HTMLInputElement).value = '' : '';
    const taskDesEle: HTMLElement | null = document.getElementById('taskDes');
    taskNameEle? (taskDesEle as HTMLInputElement).value = '' : '';
  }
}
