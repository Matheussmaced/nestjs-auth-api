import { Controller, Post, Body } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDto } from 'src/users/dto/login.dto';

@Controller('auth')
export class AuthController {
  //eslint-disable-next-line
  constructor(private authService: AuthService) { }

  @Post('login')
  login(@Body() dto: LoginDto) {
    return this.authService.login(dto.email, dto.password);
  }
}
