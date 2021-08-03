import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { HomeService } from './home.service';
import { HttpClient } from '@angular/common/http';

describe('HomeService', () => {
  let service: HomeService;
  let httpClient: HttpClient;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [HomeService]
    });
    service = TestBed.inject(HomeService);
    httpClient = TestBed.inject(HttpClient)
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('connect to API server', () => {
    beforeEach(() => {
      service.initialize();
    });

    it('call API POST to server', () => {
      spyOn(httpClient, 'post').and.callThrough();
      service.postData({taskName: 'test', taskDes: 'test'});
      expect(httpClient.post).toHaveBeenCalled();
    })

    it('call API GET to server', () => {
      spyOn(httpClient, 'get').and.callThrough();
      service.getData();
      expect(httpClient.get).toHaveBeenCalled();
    })

    it('call API PUT to server', () => {
      spyOn(httpClient, 'put').and.callThrough();
      service.moveData({taskName: 'test', teskDes: 'test'});
      expect(httpClient.put).toHaveBeenCalled();
    })

    it('call API DELETE to server', () => {
      spyOn(httpClient, 'delete').and.callThrough();
      service.deleteData({taskName: 'test', teskDes: 'test'});
      expect(httpClient.delete).toHaveBeenCalled();
    })
  })

  describe('get state', () => {
    beforeEach(() => {
      service.initialize();
    });

    it('get state as observable', () => {
      service.state$.subscribe((state) => expect(state).toEqual(service._store._state.value))
    })

    it('get state value', () => {
      let state = service.state;
      expect(state).toEqual(service._store._state.value);
    })
  })

  describe('moveTop method', () => {
    it('should return when no chosen task', () => {
      let moveTop = service.moveTop({taskName: null}, []);
      expect(moveTop).toEqual(undefined);
    })

    it('shoud run when have chosen task', () => {
      let task = {taskName: 'test3', taskDes: 'test'}
      let listTask = [{taskName: 'test', taskDes: 'test'}, {taskName: 'test2', taskDes: 'test'}, {taskName: 'test3', taskDes: 'test'}]
      service.moveTop(task, listTask);
      expect(task).toEqual({taskName: 'test', taskDes: 'test'});
    })
  })

  describe('moveDown method', () => {
    it('should return when no chosen task', () => {
      let moveTop = service.moveDown({taskName: null}, []);
      expect(moveTop).toEqual(undefined);
    })

    it('should return when chosen task is the last task', () => {
      let moveTop = service.moveDown({taskName: 'test2', taskDes: 'test'}, [{taskName: 'test', taskDes: 'test'}, {taskName: 'test2', taskDes: 'test'}]);
      expect(moveTop).toEqual(undefined);
    })

    it('shoud run when have chosen task is not the last task', () => {
      let task = {id: 1, taskName: 'test', taskDes: 'test'};
      let listTask = [{id: 1, taskName: 'test', taskDes: 'test'}, {id: 2, taskName: 'test2', taskDes: 'test'}, {id: 3, taskName: 'test3', taskDes: 'test'}];
      service.moveDown(task, listTask);
      expect(task).toEqual({id: 1, taskName: 'test2', taskDes: 'test'});
    })
  })

  it('should unsubscribe when NgOnDestroy work', () => {
    service.subscriber.push(service.state$.subscribe());
    service.ngOnDestroy();
    expect((service as any).subscriber.filter((sub: any) => sub.closed === false)).toEqual([]);
  });
});
