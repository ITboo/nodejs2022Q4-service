import { Module } from '@nestjs/common';

import { ArtistsService } from './artists.service';
import { ArtistsController } from './artists.controller';

import { TypeOrmModule } from '@nestjs/typeorm';
import { Artist } from './entities/artist.entity';
import { Track } from '../tracks/entities/track.entity';
import { Album } from '../albums/entities/album.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Artist, Track, Album])],
  controllers: [ArtistsController],
  providers: [ArtistsService],
})
export class ArtistsModule {}
