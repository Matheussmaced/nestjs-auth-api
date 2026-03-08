import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { ClientsService } from './clients.service';
import { CreateClientDto } from './dto/CreateClientDto';

@Controller('users/:userId/clients')
export class ClientsController {
  constructor(private readonly clientsService: ClientsService) { }

  @Post()
  create(@Param('userId') userId: string, @Body() data: CreateClientDto) {
    return this.clientsService.create(userId, data);
  }

  @Get()
  findAll(@Param('userId') userId: string) {
    return this.clientsService.findAll(userId);
  }
}
