import { Module } from '@nestjs/common';

import { TracksService } from './tracks.service';
import { TracksController } from './tracks.controller';

import { TypeOrmModule } from '@nestjs/typeorm';
import { Track } from './entities/track.entity';
import { User } from '../users/entities/user.entity';

import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import { AuthService } from 'src/auth/auth.service';

@Module({
  imports: [TypeOrmModule.forFeature([Track, User])],
  controllers: [TracksController],
  providers: [TracksService, UsersService, JwtService, AuthService],
})
export class TracksModule {}
