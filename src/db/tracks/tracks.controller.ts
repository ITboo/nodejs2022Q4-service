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
  UseGuards,
} from '@nestjs/common';
import { TracksService } from './tracks.service';
import { validate } from 'uuid';

import { CreateTrackDto } from './dto/createTrack.dto';
import { UpdateTrackDto } from './dto/updateTrack.dto';
import { BAD_REQUEST } from 'src/common/error';

import { AuthGuard } from 'src/auth/guards/auth.guard';

@Controller('track')
@UseGuards(AuthGuard)
export class TracksController {
  constructor(private readonly tracksService: TracksService) {}

  @Get()
  @HttpCode(HttpStatus.OK) //200
  @Header('Accept', 'application/json')
  async findAll() {
    return this.tracksService.findAll();
  }

  @Get(':id')
  @HttpCode(HttpStatus.OK) //200
  @Header('Accept', 'application/json')
  async findOne(@Param('id', new ParseUUIDPipe({ version: '4' })) id: string) {
    return this.tracksService.findOne(id);
  }

  @Post()
  @HttpCode(HttpStatus.CREATED) //201
  @Header('Accept', 'application/json')
  async create(@Body() createTrackDto: CreateTrackDto) {
    return this.tracksService.create(createTrackDto);
  }

  @UsePipes(new ValidationPipe())
  @Put(':id')
  @HttpCode(HttpStatus.OK) //200
  @Header('Accept', 'application/json')
  async update(
    @Param('id', new ParseUUIDPipe({ version: '4' }))
    id: string,
    @Body() updateTrackDto: UpdateTrackDto,
  ) {
    if (!validate(id)) {
      throw new HttpException(BAD_REQUEST, HttpStatus.BAD_REQUEST);
    }
    return this.tracksService.update(id, updateTrackDto);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  @Header('Accept', 'application/json')
  async remove(@Param('id', new ParseUUIDPipe({ version: '4' })) id: string) {
    this.tracksService.remove(id);
  }
}
