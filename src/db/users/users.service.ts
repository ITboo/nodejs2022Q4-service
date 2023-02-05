import { Injectable, NotFoundException } from '@nestjs/common';
import { v4 as uuid } from 'uuid';

import { User } from './entities/user.entity';
import { LocalDB } from '../storage';

import { CreateUserDto } from './dto/createUser.dto';
import { UpdatePasswordDto } from './dto/updatePassword.dto';

@Injectable()
export class UsersService {
  findAll() {
    return LocalDB.users;
  }

  findOne(id: string) {
    const user = LocalDB.users.find((item) => item.id === id);
    if (user === null) {
      throw new NotFoundException();
    } else {
      return user;
    }
  }

  create(createUserDto: CreateUserDto) {
    const user = new User();
    user.id = uuid();
    user.login = createUserDto.login;
    user.password = createUserDto.password;
    user.version = 1;
    user.createdAt = Date.now();
    user.updatedAt = Date.now();
    LocalDB.users.push(user);
    return user;
  }

  update(id: string, updateUserDto: UpdatePasswordDto) {
    const user = this.findOne(id);
    const index = LocalDB.users.indexOf(user);
    user.version++;
    user.password = updateUserDto.newPassword;
    user.updatedAt = Date.now();
    LocalDB.users[index] = user;
    return user;
  }

  remove(id: string) {
    const user = this.findOne(id);
    if (user) {
      LocalDB.users = LocalDB.users.filter((item) => item.id !== id);
    }
  }
}
