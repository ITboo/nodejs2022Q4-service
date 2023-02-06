import { Module } from '@nestjs/common';
import { UsersModule } from 'src/db/users/users.module';
import { ArtistsModule } from 'src/db/artists/artists.module';
import { TracksModule } from 'src/db/tracks/tracks.module';
import { AlbumsModule } from 'src/db/albums/albums.module';
import { FavoritesModule } from 'src/db/favorites/favorites.module';
import { AppController } from './app.controller';
import { AppService } from './app.service';

@Module({
  imports: [
    UsersModule,
    ArtistsModule,
    TracksModule,
    AlbumsModule,
    FavoritesModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
