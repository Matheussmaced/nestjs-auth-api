import { Injectable, NotFoundException } from '@nestjs/common';
import { ClientsRepository } from '../../domain/repositories/clients.repository';

@Injectable()
export class DeleteClientUseCase {
  constructor(private readonly clientsRepository: ClientsRepository) {}

  async execute(userId: string, clientId: string) {
    const client = await this.clientsRepository.findById(userId, clientId);

    if (!client) {
      throw new NotFoundException('Client not found');
    }

    await this.clientsRepository.delete(clientId);

    return {
      message: 'Client deleted successfully',
    };
  }
}
