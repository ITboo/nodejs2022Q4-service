import { Module } from '@nestjs/common';
import { UsersModule } from 'src/db/users/users.module';
import { ArtistsModule } from 'src/db/artists/artists.module';
import { TracksModule } from 'src/db/tracks/tracks.module';
import { AlbumsModule } from 'src/db/albums/albums.module';
import { FavoritesModule } from 'src/db/favorites/favorites.module';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CONNECTION } from './db.connection';

import { AuthModule } from 'src/auth/auth.module';

@Module({
  imports: [
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    //@ts-ignore
    TypeOrmModule.forRoot({
      ...CONNECTION,
      entities: [],
      synchronize: true,
    }),
    UsersModule,
    ArtistsModule,
    TracksModule,
    AlbumsModule,
    FavoritesModule,
    AuthModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
