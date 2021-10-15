import { NotFoundException } from '@nestjs/common';

class ArticleNotFoundException extends NotFoundException {
  constructor(articleId: number) {
    super(`Article with id ${articleId} not found`);
  }
}

export default ArticleNotFoundException;
