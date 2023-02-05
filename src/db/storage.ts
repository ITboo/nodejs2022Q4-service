import { User } from './users/entities/user.entity';
import { Artist } from './artists/entities/artist.entity';
import { Album } from './albums/entities/album.entity';
import { Track } from './tracks/entities/track.entity';
import { Favorites } from './favorites/entities/favorite.entity';

export class LocalDB {
  public static users: User[] = [];
  public static tracks: Track[] = [];
  public static albums: Album[] = [];
  public static artists: Artist[] = [];
  public static favourites: Favorites = new Favorites();
}
