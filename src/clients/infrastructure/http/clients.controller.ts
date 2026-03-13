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
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { ApiBearerAuth } from '@nestjs/swagger';

import { CreateClientUseCase } from '../../application/use-cases/create-client.usecase';
import { FindClientsUseCase } from '../../application/use-cases/find-clients.usecase';
import { UpdateClientUseCase } from '../../application/use-cases/update-client.usecase';
import { DeleteClientUseCase } from '../../application/use-cases/delete-client.usecase';
import { CreateClientDto } from 'src/clients/application/DTO/create-client.dto';
import { UpdateClientDto } from 'src/clients/application/DTO/update-client.dto';

@ApiBearerAuth()
@Controller('clients')
export class ClientsController {
  constructor(
    private createClient: CreateClientUseCase,
    private findClients: FindClientsUseCase,
    private updateClient: UpdateClientUseCase,
    private deleteClient: DeleteClientUseCase,
  ) {}

  @UseGuards(JwtAuthGuard)
  @Post()
  create(@Request() req, @Body() dto: CreateClientDto) {
    //eslint-disable-next-line
    return this.createClient.execute(req.user.userId, dto);
  }

  @UseGuards(JwtAuthGuard)
  @Get()
  findAll(@Request() req) {
    //eslint-disable-next-line
    return this.findClients.execute(req.user.userId);
  }

  @UseGuards(JwtAuthGuard)
  @Patch(':id')
  update(
    @Request() req,
    @Param('id') id: string,
    @Body() dto: UpdateClientDto,
  ) {
    //eslint-disable-next-line
    return this.updateClient.execute(req.user.userId, id, dto);
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  delete(@Request() req, @Param('id') id: string) {
    //eslint-disable-next-line
    return this.deleteClient.execute(req.user.userId, id);
  }
}
