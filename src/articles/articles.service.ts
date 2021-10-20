import { Injectable } from '@nestjs/common';
import { CreateArticleDto, UpdateArticleDto } from './dto/article.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Article } from './entities/article.entity';
import { Repository } from 'typeorm';
import { ArticleNotFoundException } from './exception/article.notfound.exception';
import { User } from 'src/users/entities/user.entity';

@Injectable()
export class ArticlesService {
  constructor(
    @InjectRepository(Article)
    private articlesRepository: Repository<Article>,
  ) {}

  async create(article: CreateArticleDto, user: User) {
    const newArticle = await this.articlesRepository.create({
      ...article,
      author: user
    });
    await this.articlesRepository.save(newArticle);
    return newArticle;
  }

  findAll() {
    return this.articlesRepository.find({ relations: ['author'] });
  }

  async findOne(id: number) {
    const article = await this.articlesRepository.findOne(id, { relations: ['author'] });
    if (article) return article;
    throw new ArticleNotFoundException(id);
  }

  async update(id: number, article: UpdateArticleDto) {
    await this.articlesRepository.update(id, article);
    const updatedArticle = await this.articlesRepository.findOne(id, { relations: ['author'] });
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
