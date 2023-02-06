import {
  Header,
  ParseUUIDPipe,
  Controller,
  Body,
  Param,
  Get,
  Post,
  Put,
  Delete,
  HttpCode,
  HttpStatus,
  HttpException,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { ArtistsService } from './artists.service';
import { validate } from 'uuid';

import { CreateArtistDto } from './dto/createArtist.dto';
import { UpdateArtistDto } from './dto/updateArtist.dto';
import { BAD_REQUEST } from 'src/common/error';

@Controller('artist')
export class ArtistsController {
  constructor(private readonly artistsService: ArtistsService) {}

  @Get()
  @HttpCode(HttpStatus.OK) //200
  @Header('Accept', 'application/json')
  findAll() {
    return this.artistsService.findAll();
  }

  @Get(':id')
  @HttpCode(HttpStatus.OK) //200
  @Header('Accept', 'application/json')
  findOne(@Param('id', new ParseUUIDPipe({ version: '4' })) id: string) {
    return this.artistsService.findOne(id);
  }

  @Post()
  @HttpCode(HttpStatus.CREATED) //201
  @Header('Accept', 'application/json')
  create(@Body() createArtistDto: CreateArtistDto) {
    return this.artistsService.create(createArtistDto);
  }

  @UsePipes(new ValidationPipe())
  @Put(':id')
  @Header('Accept', 'application/json')
  @HttpCode(HttpStatus.OK) //200
  update(
    @Param('id', new ParseUUIDPipe({ version: '4' }))
    id: string,
    @Body() updateArtistDto: UpdateArtistDto,
  ) {
    if (!validate(id)) {
      throw new HttpException(BAD_REQUEST, HttpStatus.BAD_REQUEST);
    }
    return this.artistsService.update(id, updateArtistDto);
  }

  @Delete(':id')
  @Header('Accept', 'application/json')
  @HttpCode(HttpStatus.NO_CONTENT)
  remove(@Param('id', new ParseUUIDPipe({ version: '4' })) id: string) {
    return this.artistsService.remove(id);
  }
}
