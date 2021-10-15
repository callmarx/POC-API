import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateArticleDto } from './dto/create-article.dto';
import { UpdateArticleDto } from './dto/update-article.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Article } from './entities/article.entity';
import { Repository } from 'typeorm';
import ArticleNotFoundException from './exception/articleNotFound.exception';

@Injectable()
export class ArticlesService {
  constructor(
    @InjectRepository(Article)
    private articlesRepository: Repository<Article>,
  ) {}

  async create(article: CreateArticleDto) {
    const newArticle = await this.articlesRepository.create(article);
    await this.articlesRepository.save(newArticle);
    return newArticle;
  }

  findAll() {
    return this.articlesRepository.find();
  }

  async findOne(id: number) {
    const article = await this.articlesRepository.findOne(id);
    if (article) return article;
    throw new ArticleNotFoundException(id);
  }

  async update(id: number, article: UpdateArticleDto) {
    await this.articlesRepository.update(id, article);
    const updatedArticle = await this.articlesRepository.findOne(id);
    if (updatedArticle) return updatedArticle;
    throw new ArticleNotFoundException(id);
  }

  async remove(id: number) {
    const deleteResponse = await this.articlesRepository.delete(id);
    if (!deleteResponse.affected) {
      throw new ArticleNotFoundException(id);
    }
  }
}
