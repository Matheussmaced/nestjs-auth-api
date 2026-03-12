import { Injectable } from '@nestjs/common';
import { ClientsRepository } from '../../domain/repositories/clients.repository';
import { Client } from '../../domain/entities/client.entity';

@Injectable()
export class FindClientsUseCase {
  constructor(private readonly clientsRepository: ClientsRepository) {}

  async execute(userId: string): Promise<Client[]> {
    return this.clientsRepository.findAll(userId);
  }
}
