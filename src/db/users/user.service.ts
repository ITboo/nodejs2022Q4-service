import { Injectable } from '@nestjs/common';
import { User } from './user';

@Injectable()
export class UsersService {
  async findAll(): Promise<User[]> {
    return db.users;
  }
}
