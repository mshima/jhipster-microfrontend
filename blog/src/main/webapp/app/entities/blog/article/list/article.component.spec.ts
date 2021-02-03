import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpHeaders, HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { of } from 'rxjs';

import { ArticleService } from '../service/article.service';
import { Article } from '../article.model';

import { ArticleComponent } from './article.component';

describe('Component Tests', () => {
  describe('Article Management Component', () => {
    let comp: ArticleComponent;
    let fixture: ComponentFixture<ArticleComponent>;
    let service: ArticleService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [HttpClientTestingModule],
        declarations: [ArticleComponent],
      })
        .overrideTemplate(ArticleComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(ArticleComponent);
      comp = fixture.componentInstance;
      service = TestBed.inject(ArticleService);

      const headers = new HttpHeaders().append('link', 'link;link');
      spyOn(service, 'query').and.returnValue(
        of(
          new HttpResponse({
            body: [new Article(123)],
            headers,
          })
        )
      );
    });

    it('Should call load all on init', () => {
      // WHEN
      comp.ngOnInit();

      // THEN
      expect(service.query).toHaveBeenCalled();
      expect(comp.articles?.[0]).toEqual(jasmine.objectContaining({ id: 123 }));
    });
  });
});
