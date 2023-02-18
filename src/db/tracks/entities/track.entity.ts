import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  JoinColumn,
  ManyToOne,
} from 'typeorm';
import { Artist } from '../../artists/entities/artist.entity';
import { Album } from '../../albums/entities/album.entity';

@Entity('track')
export class Track {
  @PrimaryGeneratedColumn('uuid')
  id: string;
  @Column()
  name: string;
  @ManyToOne(() => Artist, (Artist) => Artist.id, {
    nullable: true,
    onDelete: 'SET NULL',
  })
  @JoinColumn()
  artistId: string | null;
  @ManyToOne(() => Album, (Album) => Album.id, {
    nullable: true,
    onDelete: 'SET NULL',
  })
  @JoinColumn()
  albumId: string | null;
  @Column()
  duration: number;
}
