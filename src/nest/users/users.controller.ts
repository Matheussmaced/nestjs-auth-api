import { Controller, Post, Body, Get, Delete, Param } from '@nestjs/common';
import { UsersService } from './users.servicer';
import { RegisterDto } from 'src/users/dto/register.dto';

@Controller('users')
export class UsersController {
  //eslint-disable-next-line
  constructor(private usersService: UsersService) { }

  @Get('/all')
  findAll() {
    return this.usersService.findAll();
  }

  @Post()
  create(@Body() dto: RegisterDto) {
    return this.usersService.create(dto);
  }

  @Delete(':id')
  delete(@Param('id') id: string) {
    return this.usersService.delete(id);
  }
}
