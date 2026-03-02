import { Controller, Post, Body } from '@nestjs/common';
import { UsersService } from './users.servicer';
import { RegisterDto } from 'src/users/dto/register.dto';

@Controller('users')
export class UsersController {
  constructor(private usersService: UsersService) { }

  @Post()
  create(@Body() dto: RegisterDto) {
    return this.usersService.create(dto);
  }
}
