import { UsersService } from './users.service';
import { Controller, Get, Put, Post, Delete } from '@nestjs/common';

@Controller('user')
export class UsersController {
  constructor(private readonly userService: UsersService) {
    @Post()
    create(@Body() input: CreateUserDto) {
      return this.usersService.create(input);
    }

    @Get()
    findAll() {
      return this.usersService.findAll();
    }

    @Get(':id')
    findOne(@Param('id') id: string) {
      validateUUIDv4(id);
      return this.usersService.findOne(id);
    }

    @Put(':id')
    update(@Param('id') id: string, @Body() input: UpdateUserDto) {
      validateUUIDv4(id);
      return this.usersService.update(id, input);
    }

    @Delete(':id')
    @HttpCode(204)
    remove(@Param('id') id: string) {
      validateUUIDv4(id);
      return this.usersService.remove(id);
    }
  }
}