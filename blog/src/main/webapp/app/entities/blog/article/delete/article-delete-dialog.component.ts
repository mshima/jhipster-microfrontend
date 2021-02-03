import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

import { IArticle } from '../article.model';
import { ArticleService } from '../service/article.service';

@Component({
  templateUrl: './article-delete-dialog.component.html',
})
export class ArticleDeleteDialogComponent {
  article?: IArticle;

  constructor(protected articleService: ArticleService, public activeModal: NgbActiveModal) {}

  cancel(): void {
    this.activeModal.dismiss();
  }

  confirmDelete(id: number): void {
    this.articleService.delete(id).subscribe(() => {
      this.activeModal.close('deleted');
    });
  }
}
