import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { SERVER_API_URL } from 'ng-jhipster/config/constants';

import { LogsService } from './logs.service';

describe('Service Tests', () => {
  describe('Logs Service', () => {
    let service: LogsService;
    let httpMock: HttpTestingController;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [HttpClientTestingModule],
      });

      service = TestBed.inject(LogsService);
      httpMock = TestBed.inject(HttpTestingController);
    });

    afterEach(() => {
      httpMock.verify();
    });

    describe('Service methods', () => {
      it('should call correct URL', () => {
        service.findAll().subscribe();

        const req = httpMock.expectOne({ method: 'GET' });
        const resourceUrl = SERVER_API_URL + 'management/loggers';
        expect(req.request.url).toEqual(resourceUrl);
      });

      it('should change log level', () => {
        service.changeLevel('main', 'ERROR').subscribe();

        const req = httpMock.expectOne({ method: 'POST' });
        const resourceUrl = SERVER_API_URL + 'management/loggers/main';
        expect(req.request.url).toEqual(resourceUrl);
        expect(req.request.body).toEqual({ configuredLevel: 'ERROR' });
      });
    });
  });
});
