import { Injectable, NotFoundException } from '@nestjs/common';
import { User } from './interfaces/user.interface';
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
    return newUser;
  }

  async update(): Promise<User> {
    return user;
  }

  async delete(id: string): Promise<void> {
  }
}
