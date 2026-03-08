import {
  Body,
  Controller,
  Get,
  Post,
  UseGuards,
  Request,
  Param,
  Patch,
  Delete,
} from '@nestjs/common';
import { ClientsService } from './clients.service';
import { CreateClientDto } from './dto/CreateClientDto';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { UpdateClientDto } from './dto/UpdateClientDTO';

@Controller('clients')
export class ClientsController {
  constructor(private readonly clientsService: ClientsService) { }

  @UseGuards(JwtAuthGuard)
  @Post()
  create(@Request() req, @Body() data: CreateClientDto) {
    return this.clientsService.create(req.user.userId, data);
  }

  @UseGuards(JwtAuthGuard)
  @Get()
  findAll(@Request() req) {
    return this.clientsService.findAll(req.user.userId);
  }
  @UseGuards(JwtAuthGuard)
  @Patch(':id')
  update(
    @Request() req,
    @Param('id') id: string,
    @Body() data: UpdateClientDto,
  ) {
    return this.clientsService.update(req.user.userId, id, data);
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  delete(@Request() req, @Param('id') id: string) {
    return this.clientsService.delete(req.user.userId, id);
  }
}
