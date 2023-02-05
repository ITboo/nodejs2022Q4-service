import { User } from './users/interfaces/user.interface';
import { Artist } from './artists/artist';
import { Album } from './albums/album';
import { Track } from './tracks/track';
import { Favorites } from './favorites/favorite';

export class LocalDB {
  public static users: User[] = [];
  public static tracks: Track[] = [];
  public static albums: Album[] = [];
  public static artists: Artist[] = [];
  public static favourites: Favorites = new Favorites();
}
