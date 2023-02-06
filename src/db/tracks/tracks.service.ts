import { Injectable, NotFoundException } from '@nestjs/common';
import { v4 as uuid } from 'uuid';

import { Track } from '../tracks/entities/track.entity';
import { LocalDB } from '../storage';

import { CreateTrackDto } from './dto/createTrack.dto';
import { UpdateTrackDto } from './dto/updateTrack.dto';
import { TRACK_NOT_FOUND } from 'src/common/error';

@Injectable()
export class TracksService {
  findAll() {
    return LocalDB.tracks;
  }

  findOne(id: string) {
    const track = LocalDB.tracks.find((item) => item.id === id);
    if (!track) {
      throw new NotFoundException(TRACK_NOT_FOUND);
    } else {
      return track;
    }
  }

  create(createTrackDto: CreateTrackDto) {
    const track = new Track();
    track.id = uuid();
    track.name = createTrackDto.name;
    track.duration = createTrackDto.duration;
    track.artistId = createTrackDto.artistId || null;
    track.albumId = createTrackDto.albumId || null;
    LocalDB.tracks.push(track);
    return track;
  }

  update(id: string, updateTrackDto: UpdateTrackDto) {
    const track = this.findOne(id);
    const index = LocalDB.tracks.indexOf(track);
    track.name = updateTrackDto.name;
    track.duration = updateTrackDto.duration;
    track.artistId = updateTrackDto.artistId || null;
    track.albumId = updateTrackDto.albumId || null;
    LocalDB.tracks[index] = track;
    return track;
  }

  remove(id: string) {
    const track = this.findOne(id);
    if (track) {
      LocalDB.tracks = LocalDB.tracks.filter((item) => item.id !== id);
      LocalDB.tracks.forEach((track) => {
        if (track.artistId === id) {
          track.artistId = null;
        }
      });
    }
  }
}
