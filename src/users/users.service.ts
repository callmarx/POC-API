import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User, UNIQUE_USER_EMAIL_CONSTRAINT } from './entities/user.entity';
import { CreateUserDto } from './dto/user.dto';
import { UserEmailAlreadyExists, UserEmailNotFoundException, UserIdNotFoundException } from './exception/user.exception';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>
  ) {}

  async getByEmail(email: string) {
    const user = await this.usersRepository.findOne({ email });
    if (user) {
      return user;
    }
    throw new UserEmailNotFoundException(email);
  }

  async getById(id: number) {
    const user = await this.usersRepository.findOne({ id });
    if (user) {
      return user;
    }
    throw new UserIdNotFoundException(id);
  }

  async create(userData: CreateUserDto) {
    try {
      const newUser = await this.usersRepository.create(userData);
      await this.usersRepository.save(newUser);
      return newUser;
    } catch (error) {
      if (error?.constraint === UNIQUE_USER_EMAIL_CONSTRAINT) {
        throw new UserEmailAlreadyExists();
      }
      throw new InternalServerErrorException();
    }
  }
}
