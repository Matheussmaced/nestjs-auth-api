import { Module } from '@nestjs/common';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { PrismaModule } from 'prisma/prisma.module';
import { ClientsModule } from './clients/clients.module';

@Module({
  imports: [PrismaModule, UsersModule, AuthModule, ClientsModule],
})
//eslint-disable-next-line
export class AppModule { }
