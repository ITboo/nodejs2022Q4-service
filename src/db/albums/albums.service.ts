import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateAlbumDto } from './dto/createAlbum.dto';
import { UpdateAlbumDto } from './dto/updateAlbum.dto';
import { Album } from '../albums/entities/album.entity';
import { LocalDB } from '../storage';
import { v4 as uuid } from 'uuid';
import { ALBUM_NOT_FOUND } from 'src/common/error';

@Injectable()
export class AlbumsService {
  findAll() {
    return LocalDB.albums;
  }

  findOne(id: string) {
    const album = LocalDB.albums.find((item) => item.id === id);
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
    LocalDB.albums.push(album);
    return album;
  }

  update(id: string, updateAlbumDto: UpdateAlbumDto) {
    const album = this.findOne(id);
    const index = LocalDB.albums.indexOf(album);
    album.name = updateAlbumDto.name;
    album.year = updateAlbumDto.year;
    album.artistId = updateAlbumDto.artistId;
    LocalDB.albums[index] = album;
    return album;
  }

  remove(id: string) {
    const album = this.findOne(id);
    if (album) {
      LocalDB.albums = LocalDB.albums.filter((item) => item.id !== id);
      LocalDB.tracks.forEach((track) => {
        if (track.albumId === id) {
          track.albumId = null;
        }
      });
    }
  }
}
