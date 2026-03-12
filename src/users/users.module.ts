import { Module } from '@nestjs/common';
import { UsersController } from 'src/nest/users/users.controller';
import { UsersService } from 'src/nest/users/users.servicer';

@Module({
  controllers: [UsersController],
  providers: [UsersService],
  exports: [UsersService],
})
export class UsersModule {}
