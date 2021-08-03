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

  describe('connect to API server methods: postData, getData, moveData, deleteData', () => {

    it('should call API POST to server when add new task', () => {
      spyOn(httpClient, 'post').and.callThrough();
      service.postData({taskName: 'test', taskDes: 'test'});
      expect(httpClient.post).toHaveBeenCalled();
    })

    it('should call API GET to server when get data to store', () => {
      spyOn(httpClient, 'get').and.callThrough();
      service.getData();
      expect(httpClient.get).toHaveBeenCalled();
    })

    it('should call API PUT to server when move task (top/down)', () => {
      spyOn(httpClient, 'put').and.callThrough();
      service.moveData({taskName: 'test', teskDes: 'test'});
      expect(httpClient.put).toHaveBeenCalled();
    })

    it('should call API DELETE to server when done a task', () => {
      spyOn(httpClient, 'delete').and.callThrough();
      service.deleteData({taskName: 'test', teskDes: 'test'});
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

  describe('moveTop method', () => {
    beforeEach(() => {
      service.getData();
    });

    it('should return a null task when no chosen task', () => {
      let moveTop = service.moveTop({taskName: null});
      expect(moveTop).toEqual({taskName: null, taskDes: null});
    })

    it('shoud move the chosen task to top when have chosen task', () => {
      setTimeout(function () {
        let task = service.state[3]
        service.moveTop(task);
        expect(task).toEqual(service.state[0]);
      },3000);
    })
  })

  describe('moveDown method', () => {
    beforeEach(() => {
      service.getData();
    });

    it('should return a null task when no chosen task', () => {
      let moveTop = service.moveDown({taskName: null});
      expect(moveTop).toEqual({taskName: null, taskDes: null});
    })

    it('should return a null task when chosen task is the last task', () => {
      let moveTop = service.moveDown(service.state[service.state.length-1]);
      expect(moveTop).toEqual({taskName: null, taskDes: null});
    })

    it('shoud move the chosen task down when have chosen task and it is not the last task', () => {
      setTimeout(function () {
        let task = service.state[2];
        service.moveDown(task);
        expect(task).toEqual(service.state[3]);
      }, 3000)
    })
  })

  it('should unsubscribe when NgOnDestroy work', () => {
    service.subscriber.push(service.state$.subscribe());
    service.ngOnDestroy();
    expect((service as any).subscriber.filter((sub: any) => sub.closed === false)).toEqual([]);
  });
});
