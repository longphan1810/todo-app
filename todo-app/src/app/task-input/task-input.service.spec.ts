import { TestBed } from '@angular/core/testing';

import { TaskInputService } from './task-input.service';

describe('TaskInputService', () => {
  let service: TaskInputService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TaskInputService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
