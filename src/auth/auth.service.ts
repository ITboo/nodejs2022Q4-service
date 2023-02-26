import {
  Injectable,
} from '@nestjs/common';

import { User } from 'src/db/users/entities/user.entity';
import { UsersService } from 'src/db/users/users.service';

import { JwtService } from '@nestjs/jwt';
//import * as bcrypt from 'bcrypt';

import { SignUpDto } from './dto/signup.dto';
import { RefreshDto } from './dto/refresh.dto';
import { LoginDto } from './dto/login.dto';

@Injectable()
export class AuthService {
  constructor(
    private jwtService: JwtService,
    private usersService: UsersService,
  ) {}
}
