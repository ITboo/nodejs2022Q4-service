import {
  Injectable,
  NotFoundException,
  HttpStatus,
  HttpException,
} from '@nestjs/common';
import { v4 as uuid } from 'uuid';

import { User } from './entities/user.entity';

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

  async findAll() {
    return await this.userRepository.find();
  }

  async findOne(id: string) {
    const user = await this.userRepository.find({ where: { id } });
    if (!user) {
      throw new NotFoundException(HttpStatus.NOT_FOUND);
    } else {
      return user;
    }
  }

  async create(createUserDto: CreateUserDto) {
    const user = new User();
    user.id = uuid();
    user.login = createUserDto.login;
    user.password = createUserDto.password;
    user.version = 1;
    user.createdAt = new Date().getTime();
    user.updatedAt = new Date().getTime();
    this.userRepository.create(user);
    return await this.userRepository.save(user);
  }

  async update(id: string, { oldPassword, newPassword }: UpdatePasswordDto) {
    const user = await this.findOne(id);
    if (user) {
      if (user.password != oldPassword) {
        throw new HttpException('Error', HttpStatus.FORBIDDEN);
      }
      user.version++;
      user.password = newPassword;
      user.updatedAt = Date.now();
      return user;
    } else {
      throw new HttpException('Not Found', HttpStatus.NOT_FOUND);
    }
  }

  async remove(id: string) {
    const user = await this.findOne(id);
    if (user) {
      await this.userRepository.delete(id);
    }
  }
}
