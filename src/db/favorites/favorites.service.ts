import {
  forwardRef,
  Inject,
  Injectable,
  NotFoundException,
  UnprocessableEntityException,
} from '@nestjs/common';

import { AlbumsService } from '../albums/albums.service';
import { ArtistsService } from '../artists/artists.service';
import { TracksService } from '../tracks/tracks.service';

import {
  ALBUM_NOT_FOUND,
  ARTIST_NOT_FOUND,
  ERR,
  TRACK_NOT_FOUND,
} from 'src/common/error';

import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Artist } from '../artists/entities/artist.entity';
import { Album } from '../albums/entities/album.entity';
import { Track } from '../tracks/entities/track.entity';
import { Favorites } from './entities/favorite.entity';

const ID = 1;

@Injectable()
export class FavoritesService {
  @Inject(forwardRef(() => AlbumsService))
  private readonly albumsService: AlbumsService;
  @Inject(forwardRef(() => ArtistsService))
  private readonly artistsService: ArtistsService;
  @Inject(forwardRef(() => TracksService))
  private readonly tracksService: TracksService;

  constructor(
    @InjectRepository(Artist)
    private artistRepository: Repository<Artist>,
    @InjectRepository(Album)
    private albumRepository: Repository<Album>,
    @InjectRepository(Track)
    private trackRepository: Repository<Track>,
    @InjectRepository(Favorites)
    private favoritesRepository: Repository<Favorites>,
  ) {}

  async findAll(): Promise<Favorites[]> {
    return await this.favoritesRepository.find();
  }

  async findOne(id = ID): Promise<Favorites> {
    const favs = await this.favoritesRepository.findOne({
      where: { userId: id },
    });
    if (!favs) {
      throw new NotFoundException();
    } else {
      return favs;
    }
  }

  async addArtist(id: string) {
    const favs = await this.favsHandler();
    try {
      const artist = await this.artistsService.findOne(id);
      favs.artists.push(artist);
    } catch (err) {
      throw new UnprocessableEntityException(ERR);
    }
  }

  async addAlbum(id: string) {
    const favs = await this.favsHandler();
    try {
      const album = await this.albumsService.findOne(id);
      favs.albums.push(album);
    } catch (err) {
      throw new UnprocessableEntityException(ERR);
    }
    await this.favoritesRepository.save(favs);
  }
  async addTrack(id: string) {
    const favs = await this.favsHandler();
    try {
      const track = await this.tracksService.findOne(id);
      favs.tracks.push(track);
    } catch (err) {
      throw new UnprocessableEntityException(ERR);
    }
    await this.favoritesRepository.save(favs);
  }

  async removeAlbum(id: string): Promise<void> {
    const favs = await this.favsHandler();
    const album = favs.albums.find((el) => el.id === id);
    if (album) {
      favs.albums = favs.albums.filter((el) => el.id !== id);
      await this.favoritesRepository.save(favs);
    } else {
      throw new NotFoundException(ALBUM_NOT_FOUND);
    }
    await this.favoritesRepository.save(favs);
  }

  async removeArtist(id: string): Promise<void> {
    const favs = await this.favsHandler();
    const artist = favs.artists.find((el) => el.id === id);
    if (artist) {
      favs.artists = favs.artists.filter((el) => el.id !== id);
      await this.favoritesRepository.save(favs);
    } else {
      throw new NotFoundException(ARTIST_NOT_FOUND);
    }
  }

  async removeTrack(id: string): Promise<void> {
    const favs = await this.favsHandler();
    const track = favs.tracks.find((el) => el.id === id);
    if (track) {
      favs.tracks = favs.tracks.filter((el) => el.id !== id);
      await this.favoritesRepository.save(favs);
    } else {
      throw new NotFoundException(TRACK_NOT_FOUND);
    }
  }

  private favsObject = () => {
    const favorites = new Favorites();
    favorites.artists = [];
    favorites.tracks = [];
    favorites.albums = [];
    return favorites;
  };

  async favsHandler() {
    const favs = await this.findOne();
    return favs ? favs : this.favsObject();
  }
}
