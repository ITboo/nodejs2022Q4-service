import { Entity, PrimaryColumn, ManyToMany, JoinTable } from 'typeorm';
import { Exclude } from 'class-transformer';

import { Artist } from '../../artists/entities/artist.entity';
import { Album } from '../../albums/entities/album.entity';
import { Track } from '../../tracks/entities/track.entity';

@Entity('favorite')
export class Favorites {
  @PrimaryColumn()
  @Exclude()
  userId: number;

  @ManyToMany(() => Artist, { eager: true })
  @JoinTable()
  artists: Artist[];

  @ManyToMany(() => Album, { eager: true })
  @JoinTable()
  albums: Album[];

  @ManyToMany(() => Track, { eager: true })
  @JoinTable()
  tracks: Track[];
}
