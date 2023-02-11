import { Module } from '@nestjs/common';
/*import { UsersModule } from 'src/db/users/users.module';
import { ArtistsModule } from 'src/db/artists/artists.module';
import { TracksModule } from 'src/db/tracks/tracks.module';
import { AlbumsModule } from 'src/db/albums/albums.module';
import { FavoritesModule } from 'src/db/favorites/favorites.module';*/
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CONNECTION } from './db.connection';

@Module({
  imports: [
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    //@ts-ignore
    TypeOrmModule.forRoot({
      ...CONNECTION,
      entities: [],
      synchronize: true,
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
