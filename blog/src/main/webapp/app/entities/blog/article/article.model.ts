export interface IArticle {
  id?: number;
  title?: string;
}

export class Article implements IArticle {
  constructor(public id?: number, public title?: string) {}
}
