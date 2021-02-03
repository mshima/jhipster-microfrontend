import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { Article } from '../article.model';

import { ArticleDetailComponent } from './article-detail.component';

describe('Component Tests', () => {
  describe('Article Management Detail Component', () => {
    let comp: ArticleDetailComponent;
    let fixture: ComponentFixture<ArticleDetailComponent>;

    beforeEach(() => {
      TestBed.configureTestingModule({
        declarations: [ArticleDetailComponent],
        providers: [
          {
            provide: ActivatedRoute,
            useValue: { data: of({ article: new Article(123) }) },
          },
        ],
      })
        .overrideTemplate(ArticleDetailComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(ArticleDetailComponent);
      comp = fixture.componentInstance;
    });

    describe('OnInit', () => {
      it('Should load article on init', () => {
        // WHEN
        comp.ngOnInit();

        // THEN
        expect(comp.article).toEqual(jasmine.objectContaining({ id: 123 }));
      });
    });
  });
});
