import {
  Controller,
  Post,
  Body,
  Get,
  Delete,
  Param,
  Put,
} from '@nestjs/common';
import { UsersService } from './users.servicer';
import { RegisterDto } from 'src/users/dto/register.dto';
import { UpdateUserDto } from 'src/users/dto/update-user.dto';

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

  @Put(':id')
  update(@Param('id') id: string, @Body() dto: UpdateUserDto) {
    return this.usersService.update(id, dto);
  }

  @Delete(':id')
  delete(@Param('id') id: string) {
    return this.usersService.delete(id);
  }
}
