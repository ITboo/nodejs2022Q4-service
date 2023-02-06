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
  ClassSerializerInterceptor,
  UseInterceptors,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { validate } from 'uuid';

import { CreateUserDto } from './dto/createUser.dto';
import { UpdatePasswordDto } from './dto/updatePassword.dto';

@UseInterceptors(ClassSerializerInterceptor)
@Controller('user')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get()
  @HttpCode(HttpStatus.OK) //200
  @Header('Accept', 'application/json')
  findAll() {
    return this.usersService.findAll();
  }

  @Get(':id')
  @HttpCode(HttpStatus.OK) //200
  @Header('Accept', 'application/json')
  findOne(@Param('id', new ParseUUIDPipe({ version: '4' })) id: string) {
    return this.usersService.findOne(id);
  }

  @UsePipes(new ValidationPipe())
  @Post()
  @HttpCode(HttpStatus.CREATED) //201
  @Header('Accept', 'application/json')
  create(@Body() createUserDto: CreateUserDto) {
    return this.usersService.create(createUserDto);
  }

  @UsePipes(new ValidationPipe())
  @Put(':id')
  @HttpCode(HttpStatus.OK) //200
  @Header('Accept', 'application/json')
  update(
    @Param('id', new ParseUUIDPipe({ version: '4' }))
    id: string,
    @Body() { oldPassword, newPassword }: UpdatePasswordDto,
  ) {
    const user = this.usersService.findOne(id);
    if (!validate(id)) {
      throw new HttpException('Error', HttpStatus.BAD_REQUEST);
    }
    if (!user) {
      throw new HttpException('Error', HttpStatus.NOT_FOUND);
    }
    if (!oldPassword || !newPassword) {
      throw new HttpException('Error', HttpStatus.BAD_REQUEST);
    }
    if (oldPassword !== user.password) {
      throw new HttpException('Incorrect', HttpStatus.FORBIDDEN);
    }
    return this.usersService.update(id, { oldPassword, newPassword });
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  @Header('Accept', 'application/json')
  remove(@Param('id', new ParseUUIDPipe({ version: '4' })) id: string) {
    return this.usersService.remove(id);
  }
}
