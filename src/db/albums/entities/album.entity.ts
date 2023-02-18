import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { Artist } from '../../artists/entities/artist.entity';

@Entity('album')
export class Album {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column()
  year: number;

  @ManyToOne(() => Artist, (Artist) => Artist.id, {
    eager: true,
    nullable: true,
    onDelete: 'SET NULL',
  })
  @JoinColumn() // refers to Artist
  artistId: string | null;
}
