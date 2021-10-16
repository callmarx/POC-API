import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  Req,
  UseInterceptors,
  ClassSerializerInterceptor,
} from '@nestjs/common';
import JwtAuthenticationGuard from 'src/authentication/jwt-authentication.guard';
import RequestWithUser from 'src/authentication/requestWithUser.interface';
import FindOneParams from 'src/utils/findOneParams';
import { ArticlesService } from './articles.service';
import { CreateArticleDto } from './dto/create-article.dto';
import { UpdateArticleDto } from './dto/update-article.dto';

@Controller('articles')
@UseInterceptors(ClassSerializerInterceptor)
export class ArticlesController {
  constructor(private readonly articlesService: ArticlesService) {}

  @Post()
  @UseGuards(JwtAuthenticationGuard)
  create(@Body() createArticleDto: CreateArticleDto, @Req() req: RequestWithUser) {
    return this.articlesService.create(createArticleDto, req.user);
  }

  @Get()
  findAll() {
    return this.articlesService.findAll();
  }

  @Get(':id')
  findOne(@Param() { id }: FindOneParams) {
    return this.articlesService.findOne(Number(id));
  }

  @Patch(':id')
  @UseGuards(JwtAuthenticationGuard)
  update(@Param() { id }: FindOneParams, @Body() updateArticleDto: UpdateArticleDto) {
    return this.articlesService.update(Number(id), updateArticleDto);
  }

  @Delete(':id')
  remove(@Param() { id }: FindOneParams) {
    return this.articlesService.remove(Number(id));
  }
}
