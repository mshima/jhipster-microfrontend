import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { IArticle } from '../article.model';
import { ArticleService } from '../service/article.service';
import { ArticleDeleteDialogComponent } from '../delete/article-delete-dialog.component';

@Component({
  selector: 'jhi-article',
  templateUrl: './article.component.html',
})
export class ArticleComponent implements OnInit {
  articles?: IArticle[];
  isLoading = false;

  constructor(protected articleService: ArticleService, protected modalService: NgbModal) {}

  loadAll(): void {
    this.isLoading = true;

    this.articleService.query().subscribe(
      (res: HttpResponse<IArticle[]>) => {
        this.isLoading = false;
        this.articles = res.body ?? [];
      },
      () => {
        this.isLoading = false;
      }
    );
  }

  ngOnInit(): void {
    this.loadAll();
  }

  trackId(index: number, item: IArticle): number {
    return item.id!;
  }

  delete(article: IArticle): void {
    const modalRef = this.modalService.open(ArticleDeleteDialogComponent, { size: 'lg', backdrop: 'static' });
    modalRef.componentInstance.article = article;
    // unsubscribe not needed because closed completes on modal close
    modalRef.closed.subscribe(reason => {
      if (reason === 'deleted') {
        this.loadAll();
      }
    });
  }
}
