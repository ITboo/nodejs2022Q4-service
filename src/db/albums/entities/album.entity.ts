import { Entity, Column, PrimaryGeneratedColumn, JoinColumn } from 'typeorm';

@Entity('album')
export class Album {
  @PrimaryGeneratedColumn('uuid')
  id: string;
  @Column()
  name: string;
  @Column()
  year: number;
  @JoinColumn() // refers to Artist
  artistId: string | null;
}
