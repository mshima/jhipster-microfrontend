import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, Router } from '@angular/router';
import { Observable, of, EMPTY } from 'rxjs';
import { mergeMap } from 'rxjs/operators';

import { IArticle, Article } from '../article.model';
import { ArticleService } from '../service/article.service';

@Injectable({ providedIn: 'root' })
export class ArticleRoutingResolveService implements Resolve<IArticle> {
  constructor(protected service: ArticleService, protected router: Router) {}

  resolve(route: ActivatedRouteSnapshot): Observable<IArticle> | Observable<never> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        mergeMap((article: HttpResponse<Article>) => {
          if (article.body) {
            return of(article.body);
          } else {
            this.router.navigate(['404']);
            return EMPTY;
          }
        })
      );
    }
    return of(new Article());
  }
}
