import { BadRequestException, NotFoundException } from '@nestjs/common';

export class UserIdNotFoundException extends NotFoundException {
  constructor(userId: number) {
    super(`User with id ${userId} does not exist`);
  }
}

export class UserEmailNotFoundException extends NotFoundException {
  constructor(email: string) {
    super(`User with email ${email} does not exist`);
  }
}

export class UserEmailAlreadyExists extends BadRequestException {
  constructor() {
    super('User with that email already exists');
  }
}
