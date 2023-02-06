import {
  forwardRef,
  Inject,
  Injectable,
  NotFoundException,
  UnprocessableEntityException,
} from '@nestjs/common';
import { LocalDB } from '../storage';
import { IFavouritesResponse } from './entities/favorite.interface';
import { AlbumsService } from '../albums/albums.service';
import { ArtistsService } from '../artists/artists.service';
import { TracksService } from '../tracks/tracks.service';

@Injectable()
export class FavoritesService {
  @Inject(forwardRef(() => AlbumsService))
  private readonly albumsService: AlbumsService;
  @Inject(forwardRef(() => ArtistsService))
  private readonly artistsService: ArtistsService;
  @Inject(forwardRef(() => TracksService))
  private readonly tracksService: TracksService;

  findAll() {
    const result: IFavouritesResponse = {
      artists: this.artistsService
        .findAll()
        .filter((item) => LocalDB.favourites.artists.includes(item.id)),
      albums: this.albumsService
        .findAll()
        .filter((item) => LocalDB.favourites.albums.includes(item.id)),
      tracks: this.tracksService
        .findAll()
        .filter((item) => LocalDB.favourites.tracks.includes(item.id)),
    };
    return result;
  }

  addAlbum(id: string) {
    try {
      this.albumsService.findOne(id);
      LocalDB.favourites.albums.push(id);
    } catch (e) {
      throw new UnprocessableEntityException();
    }
  }
  addTrack(id: string) {
    try {
      this.tracksService.findOne(id);
      LocalDB.favourites.tracks.push(id);
    } catch (e) {
      throw new UnprocessableEntityException();
    }
  }

  addArtist(id: string) {
    try {
      this.artistsService.findOne(id);
      LocalDB.favourites.artists.push(id);
    } catch (e) {
      throw new UnprocessableEntityException();
    }
  }

  removeAlbum(id: string) {
    const album = LocalDB.favourites.albums.find((el) => el === id);
    if (album) {
      LocalDB.favourites.albums = LocalDB.favourites.albums.filter(
        (item) => item !== id,
      );
    } else {
      throw new NotFoundException();
    }
  }

  removeArtist(id: string) {
    const artist = LocalDB.favourites.artists.find((el) => el === id);
    if (artist) {
      LocalDB.favourites.artists = LocalDB.favourites.artists.filter(
        (item) => item !== id,
      );
    } else {
      throw new NotFoundException();
    }
  }

  removeTrack(id: string) {
    const track = LocalDB.favourites.tracks.find((el) => el === id);
    if (track) {
      LocalDB.favourites.tracks = LocalDB.favourites.tracks.filter(
        (item) => item !== id,
      );
    } else {
      throw new NotFoundException();
    }
  }
}
