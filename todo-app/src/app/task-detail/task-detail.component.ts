import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { TaskDetailService } from './task-detail.service';
import { Subscription } from 'rxjs';
import { ListTask, TaskForm } from './task-detail.store';

@Component({
  selector: 'app-task-detail',
  templateUrl: './task-detail.component.html',
  styleUrls: ['./task-detail.component.scss'],
  providers: [TaskDetailComponent]
})

export class TaskDetailComponent implements OnInit, OnDestroy {
  state: ListTask  = [{taskName: '', taskDes: ''}];
  task: TaskForm | undefined = {taskName: '', taskDes: ''};
  subscriber: Subscription[] = [];

  constructor(private route: ActivatedRoute, private taskDetailService: TaskDetailService) {}

  ngOnInit(): void {
    this.taskDetailService.getData()
    const getState = this.taskDetailService.state$.subscribe((state) => {
      this.state = state;
      const taskName = this.route.snapshot.params['taskName'];
      this.state.find((task: TaskForm) => task.taskName === taskName) ? this.task = this.state.find((task: TaskForm) => task.taskName === taskName) : this.task = {taskName: '', taskDes: ''};
    })
    this.subscriber.push(getState);
  }

  ngOnDestroy () {
    this.subscriber.forEach((sub) => sub.unsubscribe());
  }

  handleDelete(task: TaskForm) {
    this.state = this.state.filter((item: TaskForm) => item !== task);
    this.taskDetailService.deleteAndReload(task)
  }
}
