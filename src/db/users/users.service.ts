import {
  Injectable,
  NotFoundException,
  HttpStatus,
  HttpException,
} from '@nestjs/common';
import { v4 as uuid } from 'uuid';

import { User } from './entities/user.entity';
import { LocalDB } from '../storage';

import { CreateUserDto } from './dto/createUser.dto';
import { UpdatePasswordDto } from './dto/updatePassword.dto';

import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  findAll() {
    return this.userRepository.find();
  }

  findOne(id: string) {
    const user = this.userRepository.find({ where: { id } });
    if (!user) {
      throw new NotFoundException(HttpStatus.NOT_FOUND);
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
    user.createdAt = new Date().getTime();
    user.updatedAt = new Date().getTime();
    this.userRepository.create(user);
    return this.userRepository.save(user);
  }

  update(id: string, { oldPassword, newPassword }: UpdatePasswordDto) {
    const user = LocalDB.users.find((item) => item.id === id);
    if (user) {
      if (user.password != oldPassword) {
        throw new HttpException('Error', HttpStatus.FORBIDDEN);
      }
      const index = LocalDB.users.indexOf(user);
      user.version++;
      user.password = newPassword;
      user.updatedAt = Date.now();
      LocalDB.users[index] = user;
      return user;
    } else {
      throw new HttpException('Not Found', HttpStatus.NOT_FOUND);
    }
  }

  remove(id: string) {
    const user = this.findOne(id);
    if (user) {
      this.userRepository.delete(id);
    }
  }
}
