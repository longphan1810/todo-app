import { Router } from '@angular/router';
import { Component, Input, OnInit, Output, EventEmitter, OnChanges } from '@angular/core';
import { TaskForm } from '../home/home.store';

@Component({
  selector: 'app-task',
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.scss']
})

export class TaskComponent implements OnInit, OnChanges {
  @Input()
  task: TaskForm = {taskName: '', taskDes: ''};
  @Input()
  chosenTask: TaskForm = {taskName: '', taskDes: ''};

  @Output()
  taskSelected = new EventEmitter();

  className = '';

  constructor(private router: Router) {}

  ngOnInit(): void {}

  onTaskSelected() {
    this.taskSelected.emit(this.task);
  }

  navigateTask() {
    this.router.navigate([this.task.taskName]);
  }

  ngOnChanges() {
    const selected = "task-chosen";
    const nun = "task-item"
    this.className = this.chosenTask === this.task ? selected : nun;
  }
}


