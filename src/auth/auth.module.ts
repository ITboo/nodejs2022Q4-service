import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { User } from 'src/db/users/entities/user.entity';
import { UsersService } from 'src/db/users/users.service';

import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';

import { JwtService } from '@nestjs/jwt';

@Module({
  imports: [TypeOrmModule.forFeature([User])],
  controllers: [AuthController],
  providers: [AuthService, UsersService, JwtService],
})
export class AuthModule {}
