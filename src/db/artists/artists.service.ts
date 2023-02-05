import { Injectable, NotFoundException } from '@nestjs/common';
import { v4 as uuid } from 'uuid';

import { Artist } from '../artists/entities/artist.entity';
import { LocalDB } from '../storage';

import { CreateArtistDto } from './dto/createArtist.dto';
import { UpdateArtistDto } from './dto/updateArtist.dto';

@Injectable()
export class ArtistsService {
  findAll() {
    return LocalDB.artists;
  }

  findOne(id: string) {
    const artist = LocalDB.artists.find((item) => item.id === id);
    if (artist === null) {
      throw new NotFoundException();
    } else {
      return artist;
    }
  }

  create(createArtistDto: CreateArtistDto) {
    const artist = new Artist();
    artist.id = uuid();
    artist.name = createArtistDto.name;
    artist.grammy = createArtistDto.grammy;
    LocalDB.artists.push(artist);
    return artist;
  }

  update(id: string, updateArtistDto: UpdateArtistDto) {
    const artist = this.findOne(id);
    const index = LocalDB.artists.indexOf(artist);
    artist.name = updateArtistDto.name;
    artist.grammy = updateArtistDto.grammy;
    LocalDB.artists[index] = artist;
    return artist;
  }

  remove(id: string) {
    const artist = this.findOne(id);
    if (artist) {
      LocalDB.artists = LocalDB.artists.filter((item) => item.id !== id);
      LocalDB.tracks.forEach((track) => {
        if (track.artistId === id) {
          track.artistId = null;
        }
      });
    }
  }
}
