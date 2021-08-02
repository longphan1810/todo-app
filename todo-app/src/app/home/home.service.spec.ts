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
      service.move({taskName: 'test', teskDes: 'test'});
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

  it('should unsubscribe when NgOnDestroy work', () => {
    service.subscriber.push(service.state$.subscribe());
    service.ngOnDestroy();
    expect((service as any).subscriber.filter((sub: any) => sub.closed === false)).toEqual([]);
  });
});
