import { Injectable } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@Injectable()
//eslint-disable-next-line
export class JwtAuthGuard extends AuthGuard('jwt') {}
