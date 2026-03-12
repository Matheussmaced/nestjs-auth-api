import { Module } from '@nestjs/common';
import { ClientsController } from './infrastructure/http/clients.controller';
import { CreateClientUseCase } from './application/use-cases/create-client.usecase';
import { ClientsRepository } from './domain/repositories/clients.repository';
import { PrismaClientsRepository } from './infrastructure/prisma/prisma-clients.repository';
import { FindClientsUseCase } from './application/use-cases/find-clients.usecase';
import { UpdateClientUseCase } from './application/use-cases/update-client.usecase';
import { DeleteClientUseCase } from './application/use-cases/delete-client.usecase';

@Module({
  controllers: [ClientsController],
  providers: [
    CreateClientUseCase,
    FindClientsUseCase,
    UpdateClientUseCase,
    DeleteClientUseCase,

    {
      provide: ClientsRepository,
      useClass: PrismaClientsRepository,
    },
  ],
})
export class ClientsModule {}
