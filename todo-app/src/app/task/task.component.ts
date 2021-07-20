import { Router } from '@angular/router';
import { Component, Input, OnInit, Output, EventEmitter, OnChanges } from '@angular/core';


@Component({
  selector: 'app-task',
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.scss']
})
export class TaskComponent implements OnInit, OnChanges {
  @Input()
  task: any;
  @Input()
  chosen: any = false;



  @Output()
  taskSelected = new EventEmitter();
  constructor(private router: Router) {}

  className = '';

  ngOnInit(): void {
    console.log(this.task)
  }
  onTaskSelected() {

    this.taskSelected.emit(this.task);
  }
  navigateTask() {
    this.router.navigate([this.task.taskName])
  }

  ngOnChanges() {
    this.className = this.chosen ? "task-chosen" : "task-item";
  }

}
function block(block: any) {
  throw new Error('Function not implemented.');
}

