import { Injectable, NotFoundException } from '@nestjs/common';
import { User } from './entities/user.entity';
import { LocalDB } from '../storage';

@Injectable()
export class UsersService {
  private users: User[] = [];
  async findAll(): Promise<User[]> {
    return LocalDB.users;
  }
  async findOne(id: string): Promise<User> {
    const user = this.users.find((item) => item.id === id);
    if (user === null) {
      throw new NotFoundException();
    } else {
      return user;
    }
  }
  async create(): Promise<User> {
    return user;
  }

  async update(): Promise<User> {
    return user;
  }

  async delete(id: string): Promise<void> {
  }
}
