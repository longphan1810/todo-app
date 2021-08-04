import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { TaskDetailService } from './task-detail.service';
import { HttpClient } from '@angular/common/http';

describe('TaskDetailService', () => {
  let service: TaskDetailService;
  let httpClient: HttpClient;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [TaskDetailService]
    });

    service = TestBed.inject(TaskDetailService);
    httpClient = TestBed.inject(HttpClient)
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('connect to API server methods: getData, deleteData', () => {
    it('should call API GET to server when get data push to store', () => {
      spyOn(httpClient, 'get').and.callThrough();
      service.getData();
      expect(httpClient.get).toHaveBeenCalled();
    })

    it('should call API DELETE to server when delete current task', () => {
      spyOn(httpClient, 'delete').and.callThrough();
      service.deleteData({taskName: 'test', taskDes: 'test'});
      expect(httpClient.delete).toHaveBeenCalled();
    })
  })

  describe('get state methods', () => {

    it('should return observable of state', () => {
      service.state$.subscribe((state) => expect(state).toEqual(service.store.state.value))
    })

    it('should return state value', () => {
      let state = service.state;
      expect(state).toEqual(service.store.state.value);
    })
  })

  it('should unsubscribe when NgOnDestroy work', () => {
    service.subscriber.push(service.state$.subscribe());
    service.ngOnDestroy();
    expect((service as any).subscriber.filter((sub: any) => sub.closed === false)).toEqual([]);
  });
});
