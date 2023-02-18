import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateAlbumDto } from './dto/createAlbum.dto';
import { UpdateAlbumDto } from './dto/updateAlbum.dto';
import { Album } from '../albums/entities/album.entity';
import { v4 as uuid } from 'uuid';
import { ALBUM_NOT_FOUND } from 'src/common/error';

import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Track } from '../tracks/entities/track.entity';

@Injectable()
export class AlbumsService {
  constructor(
    @InjectRepository(Album)
    private albumRepository: Repository<Album>,
    @InjectRepository(Track)
    private trackRepository: Repository<Track>,
  ) {}

  findAll() {
    return this.albumRepository.find();
  }

  findOne(id: string) {
    const album = this.albumRepository.findOne({ where: { id } });
    if (!album) {
      throw new NotFoundException(ALBUM_NOT_FOUND);
    } else {
      return album;
    }
  }

  create(createAlbumDto: CreateAlbumDto) {
    const album = new Album();
    album.id = uuid();
    album.name = createAlbumDto.name;
    album.year = createAlbumDto.year;
    album.artistId = createAlbumDto.artistId || null;
    return this.albumRepository.save(album);
  }

  update(id: string, updateAlbumDto: UpdateAlbumDto) {
    const album = this.findOne(id);
    //const index = LocalDB.albums.indexOf(album);
    album.name = updateAlbumDto.name;
    album.year = updateAlbumDto.year;
    album.artistId = updateAlbumDto.artistId;
    return this.albumRepository.save(album);
    return album;
  }

  remove(id: string) {
    const album = this.findOne(id);
    if (album) {
      this.albumRepository.delete(id);
    }
  }
}
