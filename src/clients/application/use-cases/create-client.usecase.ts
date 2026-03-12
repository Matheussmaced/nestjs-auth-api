import { Injectable } from '@nestjs/common';
import { ClientsRepository } from '../../domain/repositories/clients.repository';
import { Client } from '../../domain/entities/client.entity';
import { randomUUID } from 'crypto';
import { CreateClientDto } from '../DTO/create-client.dto';

@Injectable()
export class CreateClientUseCase {
  constructor(private clientsRepository: ClientsRepository) {}

  async execute(userId: string, dto: CreateClientDto) {
    const client = new Client(
      randomUUID(),
      dto.name,
      dto.email,
      dto.phone,
      userId,
      dto.active ?? true,
    );

    return this.clientsRepository.create(client);
  }
}
