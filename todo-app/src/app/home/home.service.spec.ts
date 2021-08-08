import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { HomeService } from './home.service';
import { HttpClient } from '@angular/common/http';
import { ListTask } from './home.store';

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
      service.postAndReload({id: 0, taskName: 'test', taskDes: 'test'});
      expect(httpClient.post).toHaveBeenCalled();
    })

    it('should call API GET to server when get data to store', () => {
      spyOn(httpClient, 'get').and.callThrough();
      service.getData();
      expect(httpClient.get).toHaveBeenCalled();
    })

    it('should call API PUT to server when move task (top/down)', () => {
      spyOn(httpClient, 'put').and.callThrough();
      service.moveData({task: {id: 0, taskName: 'test', taskDes: 'test'}, nextTask: {id: 0, taskName: 'test', taskDes: 'test'}});
      expect(httpClient.put).toHaveBeenCalled();
    })

    it('should call API DELETE to server when done a task', () => {
      spyOn(httpClient, 'delete').and.callThrough();
      service.deleteAndReload({id: 0, taskName: 'test', taskDes: 'test'});
      expect(httpClient.delete).toHaveBeenCalled();
    })
  })

  describe('get state', () => {
    it('should return observable of state', () => {
      let stateValue: ListTask;
      service.state$.subscribe((state) => stateValue = state);
      setTimeout(function() {
        expect(stateValue).toEqual(service.store.state.value)
      }, 3000)
    })

    it('should return state value', () => {
      const state = service.state;
      expect(state).toEqual(service.store.state.value);
    })
  })

  describe('moveTop', () => {
    beforeEach(() => {
      service.getData();
    });

    it('should return a null task when no chosen task', () => {
      const moveTop = service.moveTop({taskName: '', taskDes: ''});
      expect(moveTop).toEqual({taskName: '', taskDes: ''});
    })

    it('should move the chosen task to top when have chosen task', () => {
      setTimeout(function () {
        const task = service.state[3]
        service.moveTop(task);
        expect(task).toEqual(service.state[0]);
      },3000);
    })
  })

  describe('moveDown', () => {
    beforeEach(() => {
      service.getData();
    });

    it('should return a null task when no chosen task', () => {
      const moveTop = service.moveDown({id: 0, taskName: '', taskDes: ''});
      expect(moveTop).toEqual({taskName: '', taskDes: ''});
    })

    it('should return a null task when chosen task is the last task', () => {
      const moveTop = service.moveDown(service.state[service.state.length-1]);
      expect(moveTop).toEqual({taskName: '', taskDes: ''});
    })

    it('should move the chosen task down when have chosen task and it is not the last task', () => {
      setTimeout(function () {
        const task = service.state[2];
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
