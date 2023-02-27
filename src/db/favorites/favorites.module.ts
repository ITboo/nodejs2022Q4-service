import { Module } from '@nestjs/common';
import { FavoritesService } from './favorites.service';
import { FavoritesController } from './favorites.controller';

import { TypeOrmModule } from '@nestjs/typeorm';

import { ArtistsService } from '../artists/artists.service';
import { AlbumsService } from '../albums/albums.service';
import { TracksService } from '../tracks/tracks.service';

import { User } from '../users/entities/user.entity';
import { Artist } from '../artists/entities/artist.entity';
import { Album } from '../albums/entities/album.entity';
import { Track } from '../tracks/entities/track.entity';
import { Favorites } from './entities/favorite.entity';

import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import { AuthService } from 'src/auth/auth.service';

@Module({
  imports: [TypeOrmModule.forFeature([Artist, Album, Track, Favorites, User])],
  controllers: [FavoritesController],
  providers: [
    FavoritesService,
    ArtistsService,
    AlbumsService,
    TracksService,
    UsersService,
    JwtService,
    AuthService,
  ],
})
export class FavoritesModule {}
