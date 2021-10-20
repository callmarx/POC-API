import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
  Unique
} from 'typeorm';
import { Exclude } from 'class-transformer';
import { Article } from 'src/articles/entities/article.entity';

export const UNIQUE_USER_EMAIL_CONSTRAINT = 'unique_user_email_constraint';

@Entity()
@Unique(UNIQUE_USER_EMAIL_CONSTRAINT, ['email'])
export class User {
  @PrimaryGeneratedColumn()
  public id?: number;

  @Column()
  public email: string;

  @Column()
  public name: string;

  @Column()
  @Exclude()
  public password: string;

  @OneToMany(() => Article, (article: Article) => article.author)
  public articles: Article[];

  @CreateDateColumn()
  public createdAt: Date;

  @UpdateDateColumn()
  public updatedAt: Date;
}
