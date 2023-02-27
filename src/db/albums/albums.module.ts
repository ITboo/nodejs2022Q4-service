import { Module } from '@nestjs/common';

import { AlbumsService } from './albums.service';
import { AlbumsController } from './albums.controller';

import { TypeOrmModule } from '@nestjs/typeorm';
import { Album } from './entities/album.entity';
import { Track } from '../tracks/entities/track.entity';
import { User } from '../users/entities/user.entity';

import { UsersService } from '../users/users.service';
import { AuthService } from 'src/auth/auth.service';
import { JwtService } from '@nestjs/jwt';

@Module({
  imports: [TypeOrmModule.forFeature([Album, User, Track])],
  controllers: [AlbumsController],
  providers: [AlbumsService, UsersService, AuthService, JwtService],
})
export class AlbumsModule {}
