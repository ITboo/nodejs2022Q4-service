import { Injectable, NotFoundException } from '@nestjs/common';
import { ARTIST_NOT_FOUND } from 'src/common/error';
import { v4 as uuid } from 'uuid';

import { Artist } from '../artists/entities/artist.entity';
import { LocalDB } from '../storage';

import { CreateArtistDto } from './dto/createArtist.dto';
import { UpdateArtistDto } from './dto/updateArtist.dto';

import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { User } from '../users/entities/user.entity';
import { Track } from '../tracks/entities/track.entity';
import { Album } from '../albums/entities/album.entity';

@Injectable()
export class ArtistsService {
  constructor(
    @InjectRepository(Artist)
    private artistRepository: Repository<Artist>,
    @InjectRepository(Track)
    private trackRepository: Repository<Track>,
    @InjectRepository(Album)
    private albumRepository: Repository<Album>,
  ) {}

  async findAll() {
    return this.artistRepository.find();
  }

  async findOne(id: string) {
    const artist = this.artistRepository.findOne({ where: { id } });
    if (!artist) {
      throw new NotFoundException(ARTIST_NOT_FOUND);
    } else {
      return artist;
    }
  }

  async create(createArtistDto: CreateArtistDto) {
    const artist = new Artist();
    artist.id = uuid();
    artist.name = createArtistDto.name;
    artist.grammy = createArtistDto.grammy;
    return this.artistRepository.save(artist);
  }

  async update(id: string, updateArtistDto: UpdateArtistDto) {
    const artist = this.findOne(id);
    //const index = LocalDB.artists.indexOf(artist);
    artist.name = updateArtistDto.name;
    artist.grammy = updateArtistDto.grammy;
    return this.artistRepository.save(artist);
  }

  async remove(id: string) {
    const artist = this.findOne(id);
    if (artist) {
      this.artistRepository.delete(id);
    }
  }
}
