import { Router } from '@angular/router';
import { Component, Input, OnInit, Output, EventEmitter, OnChanges } from '@angular/core';
import { taskInterface } from '../home/home.store';

@Component({
  selector: 'app-task',
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.scss']
})

export class TaskComponent implements OnInit, OnChanges {
  @Input()
  task: taskInterface = {taskName: '', taskDes: ''};
  @Input()
  chosen: boolean = false;

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
    let selected = "task-chosen";
    let nun = "task-item"
    this.className = this.chosen ? selected : nun;
  }
}


